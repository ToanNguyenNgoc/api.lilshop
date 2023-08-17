import { CorsOptions } from "cors";
import { SessionOptions } from "express-session";
import { HelmetOptions } from "helmet";

const origin_cors = process.env.CORS_ORIGIN?.split('|') || []
export const cors_options: CorsOptions = {
  origin: origin_cors,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: true,
  credentials: true
}
export const helmet_options: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://www.googletagmanager.com",
        "'self'",
        "https://www.google-analytics.com",
        "'unsafe-inline'",
        ...origin_cors,
      ],
      imgSrc: ["'self'", ...origin_cors],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
}
export const session_options: SessionOptions = {
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}