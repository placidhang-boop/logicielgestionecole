import { Router } from "express";
import { z } from "zod";

const yearSchema = z.object({
  label: z.string().min(4),
  isActive: z.boolean().optional(),
});

export function createSchoolRouter() {
  const router = Router();

  router.get("/years", (_req, res) => {
    res.json({
      years: [
        { id: "y-2025", label: "2025-2026", isActive: false, isClosed: true },
        { id: "y-2026", label: "2026-2027", isActive: true, isClosed: false },
        { id: "y-2027", label: "2027-2028", isActive: false, isClosed: false },
      ],
    });
  });

  router.get("/years/:yearId/promotions", (_req, res) => {
    res.json({
      promotions: [
        { id: "p-1", name: "1ère secondaire", schoolYear: "2026-2027" },
        { id: "p-2", name: "2ème secondaire", schoolYear: "2026-2027" },
        { id: "p-3", name: "3ème secondaire", schoolYear: "2026-2027" },
      ],
    });
  });

  router.post("/years", (req, res) => {
    const parsed = yearSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Année scolaire invalide.",
        details: parsed.error.flatten(),
      });
    }

    return res.status(201).json({
      ok: true,
      data: {
        id: `y-${Date.now()}`,
        label: parsed.data.label,
        isActive: parsed.data.isActive ?? false,
        isClosed: false,
      },
    });
  });

  return router;
}
