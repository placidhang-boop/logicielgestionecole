import { Router } from "express";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export function createCategoriesRouter() {
  const router = Router();

  const categories = [
    { id: "cat-1", name: "Enfant d'enseignant", description: "Enfant rattaché à un enseignant de l'école.", isActive: true },
    { id: "cat-2", name: "Élève supporté", description: "Élève bénéficiant d'un soutien financier externe.", isActive: true },
    { id: "cat-3", name: "Élève non supporté", description: "Élève qui prend en charge ses frais directement.", isActive: true },
  ];

  router.get("/", (_req, res) => {
    res.json({ categories });
  });

  router.post("/", (req, res) => {
    const parsed = categorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Catégorie invalide.", details: parsed.error.flatten() });
    }

    const created = {
      id: `cat-${Date.now()}`,
      ...parsed.data,
      isActive: parsed.data.isActive ?? true,
    };

    categories.unshift(created);
    return res.status(201).json({ category: created });
  });

  return router;
}
