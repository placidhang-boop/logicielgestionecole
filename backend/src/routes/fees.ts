import { Router } from "express";
import { z } from "zod";

const feeTypeSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  defaultAmount: z.coerce.number().nonnegative().optional(),
  periodicity: z.string().default("MONTHLY"),
  isRequired: z.boolean().optional(),
});

export function createFeesRouter() {
  const router = Router();

  const feeTypes = [
    { id: "fee-1", name: "Frais scolaires", description: "Montant scolaire", defaultAmount: 1200, periodicity: "MONTHLY", isRequired: true },
    { id: "fee-2", name: "Frais de fonctionnement", description: "Entretien et fonctionnement", defaultAmount: 800, periodicity: "MONTHLY", isRequired: true },
    { id: "fee-3", name: "Autres frais", description: "Divers frais annexes", defaultAmount: 400, periodicity: "MONTHLY", isRequired: false },
  ];

  router.get("/", (_req, res) => {
    res.json({ feeTypes });
  });

  router.post("/", (req, res) => {
    const parsed = feeTypeSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Type de frais invalide.", details: parsed.error.flatten() });
    }

    const created = {
      id: `fee-${Date.now()}`,
      ...parsed.data,
      defaultAmount: parsed.data.defaultAmount ?? 0,
      isRequired: parsed.data.isRequired ?? true,
    };

    feeTypes.unshift(created);
    return res.status(201).json({ feeType: created });
  });

  return router;
}
