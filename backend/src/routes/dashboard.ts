import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";

export function createDashboardRouter() {
  const router = Router();

  router.get("/overview", requireAuth, requireRole(["ADMIN", "PERCEPTEUR"]), (_req, res) => {
    res.json({
      totals: {
        students: 168,
        upToDate: 122,
        late: 23,
        inAdvance: 11,
        ended: 12,
        expected: 81260,
        collected: 67480,
        remaining: 13780,
      },
      paymentsToday: 12400,
      expensesToday: 7800,
      balance: 4600,
      byCollector: [
        { name: "A. Mukeba", amount: 14800 },
        { name: "J. Ngalula", amount: 11950 },
        { name: "M. Tshioka", amount: 9800 },
      ],
      recentPayments: [
        { pupil: "Josué Mbuyi", amount: 1800, period: "Octobre 2026", collector: "A. Mukeba" },
        { pupil: "Lina Kabila", amount: 1200, period: "Septembre 2026", collector: "J. Ngalula" },
      ],
    });
  });

  return router;
}
