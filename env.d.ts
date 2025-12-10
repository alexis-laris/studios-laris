/// <reference types="astro/client" />

type ENV = {
    RESEND_API_KEY: string;
};

type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;

declare namespace App {
    interface Locals extends Runtime { }
}
