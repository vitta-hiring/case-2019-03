import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
  apiUrl: process.env.API_URL,
  frontendUrl: process.env.FRONTEND_URL,
  mailerTransport: process.env.MAILER_MODULE_TRANSPORT,
}));
