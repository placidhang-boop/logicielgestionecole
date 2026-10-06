import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  DATABASE_URL: z
    .string()
    .default("postgresql://postgres:postgres@localhost:5432/logicielgestionecole?schema=public"),
  JWT_SECRET: z.string().default("dev-secret-change-me"),
  SESSION_SECRET: z.string().default("dev-session-secret"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const env = envSchema.parse(process.env);
