import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { confirmationEmailTemplate, notificationEmailTemplate } from '../../utils/emailTemplates';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
    try {

        const resendApiKey = import.meta.env.RESEND_API_KEY;

        console.log(resendApiKey, "SI LLEGA????");
        console.log(locals, "SI LLEGAN ESTOS????");




        const resend = new Resend(resendApiKey);




        let data: any;
        const contentType = request.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            data = await request.json();
        } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
            const formData = await request.formData();
            data = {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                mensaje: formData.get('mensaje') as string,
            };
        } else {

            const text = await request.text();
            try {
                data = JSON.parse(text);
            } catch {
                return new Response(JSON.stringify({
                    error: 'Formato de datos no válido. Use JSON o form-data.'
                }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        const { name, email, mensaje } = data;


        if (!name || !email || !mensaje) {
            return new Response(JSON.stringify({
                error: 'Faltan campos requeridos: name, email, mensaje'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({
                error: 'Formato de email no válido'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Enviar email de confirmación al usuario
        const confirmationResult = await resend.emails.send({
            from: 'Studios Laris <noreply@studioslaris.com>',
            to: email,
            subject: '✅ Hemos recibido tu mensaje - Studios Laris',
            html: confirmationEmailTemplate(name, mensaje),
        });

        // Enviar notificación al equipo de soporte
        const supportResult = await resend.emails.send({
            from: 'Studios Laris <noreply@studioslaris.com>',
            to: 'diegolaris72@gmail.com',
            subject: `🔔 Nuevo contacto de ${name}`,
            html: notificationEmailTemplate(name, email, mensaje),
            replyTo: email, // Permite responder directamente al usuario
        });

        // Verificar si ambos emails se enviaron correctamente
        if (confirmationResult.error || supportResult.error) {
            console.error('Error enviando emails:', {
                confirmation: confirmationResult.error,
                support: supportResult.error
            });

            return new Response(JSON.stringify({
                error: 'Error interno del servidor al enviar emails',
                details: {
                    confirmationSent: !confirmationResult.error,
                    supportNotificationSent: !supportResult.error
                }
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({
            success: true,
            message: 'Emails enviados correctamente',
            data: {
                confirmationId: confirmationResult.data?.id,
                supportNotificationId: supportResult.data?.id,
            }
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error en endpoint de contacto:', error);

        return new Response(JSON.stringify({
            error: 'Error interno del servidor',
            message: 'No se pudieron procesar los datos'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
