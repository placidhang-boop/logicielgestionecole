import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const bootstrapSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

export function createAuthRouter() {
  const router = Router();

  router.get("/me", async (_req, res) => {
    res.json({
      ok: true,
      user: {
        id: "admin-demo",
        email: "admin@ecole.local",
        role: "ADMIN",
        name: "Administrateur",
      },
    });
  });

  router.post("/login", async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Données de connexion invalides.",
        details: parsed.error.flatten(),
      });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email: parsed.data.email },
      });

      if (!user) {
        return res.status(401).json({ error: "Identifiants incorrects." });
      }

      const validPassword = await bcrypt.compare(parsed.data.password, user.passwordHash);

      if (!validPassword) {
        return res.status(401).json({ error: "Identifiants incorrects." });
      }

      const token = jwt.sign(
        {
          sub: user.id,
          email: user.email,
          role: user.role,
        },
        env.JWT_SECRET,
        { expiresIn: "8h" },
      );

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: "Impossible de vérifier les informations de connexion.",
      });
    }
  });

  router.post("/bootstrap-admin", async (req, res) => {
    const parsed = bootstrapSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Données invalides pour le premier administrateur.",
        details: parsed.error.flatten(),
      });
    }

    try {
      const existing = await prisma.user.findUnique({
        where: { email: parsed.data.email },
      });

      if (existing) {
        return res.status(409).json({ error: "Un compte administrateur existe déjà." });
      }

      const passwordHash = await bcrypt.hash(parsed.data.password, 12);

      const user = await prisma.user.create({
        data: {
          email: parsed.data.email,
          name: parsed.data.name,
          role: "ADMIN",
          passwordHash,
        },
      });

      const token = jwt.sign(
        {
          sub: user.id,
          email: user.email,
          role: user.role,
        },
        env.JWT_SECRET,
        { expiresIn: "8h" },
      );

      return res.status(201).json({
        ok: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: "Impossible de créer le premier administrateur.",
      });
    }
  });

  return router;
}
