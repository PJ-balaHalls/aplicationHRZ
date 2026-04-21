import { Resend } from 'resend';

// O Resend puxará automaticamente a variável RESEND_API_KEY do seu .env
export const resend = new Resend(process.env.RESEND_API_KEY);