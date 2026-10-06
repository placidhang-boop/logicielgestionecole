import { Router } from "express";
import { z } from "zod";

const paymentSchema = z.object({
  studentId: z.string().min(1),
  feeTypeId: z.string().min(1),
  amount: z.coerce.number().positive(),
  period: z.string().min(2),
  idempotencyKey: z.string().min(1).optional(),
});

export function createPaymentsRouter() {
  const router = Router();

  router.get("/summary", (_req, res) => {
    res.json({
      totalCollected: 67480,
      totalExpected: 81260,
      totalRemaining: 13780,
      payments: [
        { id: "pay-1", pupil: "Josué Mbuyi", amount: 1800, period: "Octobre 2026", status: "PAID" },
        { id: "pay-2", pupil: "Lina Kabila", amount: 1200, period: "Septembre 2026", status: "PAID" },
        { id: "pay-3", pupil: "Moses Lelo", amount: 1500, period: "Novembre 2026", status: "PARTIAL" },
      ],
    });
  });

  router.post("/register", (req, res) => {
    const parsed = paymentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Paiement invalide.",
        details: parsed.error.flatten(),
      });
    }

    return res.status(201).json({
      ok: true,
      receiptNumber: `RCPT-${Date.now()}`,
      payment: {
        ...parsed.data,
        status: "PAID",
        createdAt: new Date().toISOString(),
      },
    });
  });

  return router;
}
