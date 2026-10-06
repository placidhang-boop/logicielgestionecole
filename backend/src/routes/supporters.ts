import { Router } from "express";
import { z } from "zod";

const supporterSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  contact: z.string().optional(),
  type: z.string().min(2),
  notes: z.string().optional(),
});

export function createSupportersRouter() {
  const router = Router();

  const supporters = [
    { id: "sup-1", name: "GRS", description: "Support financier du programme", contact: "+243 900 000 100", type: "association", notes: "Couverture scolaire" },
    { id: "sup-2", name: "Rouge International", description: "Soutien humanitaire", contact: "+243 900 000 101", type: "programme", notes: "Frais scolaires" },
  ];

  router.get("/", (_req, res) => {
    res.json({ supporters });
  });

  router.post("/", (req, res) => {
    const parsed = supporterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Supporteur invalide.", details: parsed.error.flatten() });
    }

    const created = {
      id: `sup-${Date.now()}`,
      ...parsed.data,
    };

    supporters.unshift(created);
    return res.status(201).json({ supporter: created });
  });

  return router;
}
