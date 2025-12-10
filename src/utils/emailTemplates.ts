export const confirmationEmailTemplate = (name: string, mensaje: string) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
    
    <h2 style="color: #05F2AF;">¡Gracias por contactarnos, ${name}!</h2>

    <p style="font-size: 15px;">
      Hemos recibido tu mensaje y nuestro equipo se pondrá en contacto contigo lo antes posible.
    </p>

    <div style="
      margin-top: 20px;
      padding: 15px;
      border-left: 4px solid #05F2AF;
      background: #f7f7f7;
    ">
      <p style="margin: 0; font-style: italic;">"${mensaje}"</p>
    </div>

    <p style="margin-top: 25px;">
      Saludos,<br />
      <strong>Studios Laris</strong>
    </p>

  </div>
`;


export const notificationEmailTemplate = (
    name: string,
    email: string,
    mensaje: string
) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
    
    <h2 style="color: #05F2AF;">Nuevo mensaje desde Studios Laris</h2>

    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>

    <div style="
      margin-top: 15px;
      padding: 15px;
      border-left: 4px solid #05F2AF;
      background: #f7f7f7;
    ">
      <p style="margin: 0;">${mensaje}</p>
    </div>

    <p style="margin-top: 20px; font-size: 13px; color: #666;">
      Puedes responder directamente a este correo gracias al <strong>reply-to</strong>.
    </p>

  </div>
`;
