import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createAuthRouter } from "./routes/auth.js";
import { createDashboardRouter } from "./routes/dashboard.js";
import { createSchoolRouter } from "./routes/school.js";
import { createPaymentsRouter } from "./routes/payments.js";
import { createStudentsRouter } from "./routes/students.js";
import { createCategoriesRouter } from "./routes/categories.js";
import { createSupportersRouter } from "./routes/supporters.js";
import { createFeesRouter } from "./routes/fees.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN.split(","),
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$connect();
    res.json({
      ok: true,
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.json({
      ok: true,
      status: "healthy",
      database: "not-configured",
      timestamp: new Date().toISOString(),
    });
  }
});

app.use("/api/auth", createAuthRouter());
app.use("/api/dashboard", createDashboardRouter());
app.use("/api/school", createSchoolRouter());
app.use("/api/payments", createPaymentsRouter());
app.use("/api/students", createStudentsRouter());
app.use("/api/categories", createCategoriesRouter());
app.use("/api/supporters", createSupportersRouter());
app.use("/api/fees", createFeesRouter());

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({
    error: "Une erreur interne est survenue.",
  });
});

const port = env.PORT;
app.listen(port, () => {
  console.log(`Backend Logiciel Gestion École running on http://localhost:${port}`);
});

export default app;
