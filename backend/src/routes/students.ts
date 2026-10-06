import { Router } from "express";
import { z } from "zod";

const studentSchema = z.object({
  matricule: z.string().min(3),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  year: z.string().min(4),
  promotion: z.string().min(2),
  category: z.string().min(2),
  phone: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "ON_HOLD"]).optional(),
});

export function createStudentsRouter() {
  const router = Router();

  const students = [
    {
      id: "stu-1",
      matricule: "E-2025-001",
      firstName: "Josué",
      lastName: "Mbuyi",
      year: "2026-2027",
      promotion: "3ème secondaire",
      category: "Enfant d'enseignant",
      phone: "+243 999 001 001",
      status: "ACTIVE",
    },
    {
      id: "stu-2",
      matricule: "E-2025-002",
      firstName: "Lina",
      lastName: "Kabila",
      year: "2026-2027",
      promotion: "2ème secondaire",
      category: "Élève supporté",
      phone: "+243 998 551 006",
      status: "ACTIVE",
    },
    {
      id: "stu-3",
      matricule: "E-2025-003",
      firstName: "Moses",
      lastName: "Lelo",
      year: "2026-2027",
      promotion: "1ère secondaire",
      category: "Élève non supporté",
      phone: "+243 970 222 777",
      status: "ON_HOLD",
    },
  ];

  router.get("/", (_req, res) => {
    res.json({ students });
  });

  router.get("/:id", (req, res) => {
    const student = students.find((item) => item.id === req.params.id);

    if (!student) {
      return res.status(404).json({ error: "Élève introuvable." });
    }

    return res.json({ student });
  });

  router.post("/", (req, res) => {
    const parsed = studentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Élève invalide.",
        details: parsed.error.flatten(),
      });
    }

    const newStudent = {
      id: `stu-${Date.now()}`,
      ...parsed.data,
      status: parsed.data.status ?? "ACTIVE",
    };

    students.unshift(newStudent);

    return res.status(201).json({ student: newStudent });
  });

  router.put("/:id", (req, res) => {
    const parsed = studentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Mise à jour invalide.",
        details: parsed.error.flatten(),
      });
    }

    const index = students.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Élève introuvable." });
    }

    students[index] = {
      ...students[index],
      ...parsed.data,
      status: parsed.data.status ?? students[index].status,
    };

    return res.json({ student: students[index] });
  });

  return router;
}
