import {
  ArrowUpRight,
  Bell,
  CreditCard,
  DollarSign,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const stats = [
  { label: "Élèves", value: "168", change: "+8%", tone: "blue" },
  { label: "À jour", value: "122", change: "+12%", tone: "green" },
  { label: "Retard", value: "23", change: "-3%", tone: "red" },
  { label: "En avance", value: "11", change: "+1%", tone: "amber" },
];

const recentPayments = [
  { student: "Josué Mbuyi", fee: "Frais scolaires", amount: "$1,800", status: "Payé" },
  { student: "Lina Kabila", fee: "Frais de fonctionnement", amount: "$1,200", status: "Payé" },
  { student: "Moses Lelo", fee: "Autres frais", amount: "$1,500", status: "Partiel" },
];

const feeRows = [
  { student: "Kimbangu Kadi", year: "2026-2027", promo: "3e secondaire", total: "$1,750", paid: "$1,250", due: "$500", status: "Retard" },
  { student: "Mélanie Pongo", year: "2026-2027", promo: "2e secondaire", total: "$1,200", paid: "$1,200", due: "$0", status: "À jour" },
  { student: "Nadia Otshudi", year: "2026-2027", promo: "1e secondaire", total: "$1,450", paid: "$900", due: "$550", status: "Partiel" },
];

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  const navItems = useMemo(
    () => [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Élèves", icon: Users },
      { label: "Paiements", icon: CreditCard },
      { label: "Finances", icon: Wallet },
      { label: "Rapports", icon: DollarSign },
      { label: "Paramètres", icon: Settings },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <div className="mx-auto flex max-w-[1600px] gap-6 p-4 lg:p-6">
        <aside className="hidden w-72 shrink-0 flex-col rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-soft lg:flex">
          <div className="flex items-center gap-3 pb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <GraduationCap size={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">École</p>
              <h1 className="text-xl font-bold">Gestion École</h1>
            </div>
          </div>

          <nav className="mt-6 space-y-2">
            {navItems.map(({ label, icon: Icon, active }) => (
              <button
                key={label}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${
                  active ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <ShieldCheck size={16} />
              Sécurité
            </div>
            <p>WebAuthn / passkeys, licence active et audit des paiements activé.</p>
          </div>
        </aside>

        <main className="flex-1">
          <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button className="rounded-xl border border-[var(--line)] p-2 lg:hidden">
                <Menu size={18} />
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Vue d’ensemble</p>
                <h2 className="text-2xl font-bold">Dashboard administrateur</h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  className="w-52 rounded-xl border border-[var(--line)] bg-[var(--panel-alt)] py-2 pl-9 pr-3 text-sm outline-none ring-0 placeholder:text-slate-400"
                  placeholder="Rechercher..."
                />
              </div>

              <button className="rounded-xl border border-[var(--line)] p-2.5 text-slate-600 dark:text-slate-300">
                <Bell size={18} />
              </button>

              <button
                onClick={() => setDark((prev) => !prev)}
                className="rounded-xl border border-[var(--line)] p-2.5 text-slate-600 dark:text-slate-300"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="card rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <h3 className="mt-2 text-3xl font-bold">{item.value}</h3>
                  </div>
                  <div className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    item.tone === "blue" ? "bg-blue-100 text-blue-700" :
                    item.tone === "green" ? "bg-emerald-100 text-emerald-700" :
                    item.tone === "red" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {item.change}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <ArrowUpRight size={14} />
                  vs. mois précédent
                </div>
              </div>
            ))}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
            <div className="card rounded-3xl p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Receipts et dépenses</h3>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">Mois</span>
              </div>

              <div className="grid grid-cols-12 items-end gap-2">
                {[30, 45, 70, 52, 90, 64, 110, 98, 130, 118, 140, 160].map((height, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-full rounded-t-2xl ${
                        index % 2 === 0 ? "bg-blue-500" : "bg-emerald-500"
                      }`}
                      style={{ height: `${height}px` }}
                    />
                    <span className="text-[10px] text-slate-400">{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card rounded-3xl p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Paiements du jour</h3>
                <span className="text-sm text-slate-500">$12.4k</span>
              </div>

              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.student} className="flex items-center justify-between rounded-2xl border border-[var(--line)] p-3">
                    <div>
                      <p className="font-medium">{payment.student}</p>
                      <p className="text-xs text-slate-500">{payment.fee}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{payment.amount}</p>
                      <p className={`text-xs ${payment.status === "Partiel" ? "text-amber-600" : "text-emerald-600"}`}>
                        {payment.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="card rounded-3xl p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Situation des élèves</h3>
                <button className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white">+ Nouveau paiement</button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
                <table className="min-w-full divide-y divide-[var(--line)] text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900/60">
                    <tr>
                      <th className="px-4 py-3 text-xs uppercase tracking-wide text-slate-500">Élève</th>
                      <th className="px-4 py-3 text-xs uppercase tracking-wide text-slate-500">Année</th>
                      <th className="px-4 py-3 text-xs uppercase tracking-wide text-slate-500">Promotion</th>
                      <th className="px-4 py-3 text-xs uppercase tracking-wide text-slate-500">Total</th>
                      <th className="px-4 py-3 text-xs uppercase tracking-wide text-slate-500">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)] bg-[var(--panel)]">
                    {feeRows.map((row) => (
                      <tr key={row.student}>
                        <td className="px-4 py-3 font-medium">{row.student}</td>
                        <td className="px-4 py-3 text-slate-500">{row.year}</td>
                        <td className="px-4 py-3 text-slate-500">{row.promo}</td>
                        <td className="px-4 py-3 font-medium">{row.total}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                            row.status === "À jour" ? "bg-emerald-100 text-emerald-700" :
                            row.status === "Retard" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                          }`}>{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card rounded-3xl p-5">
              <h3 className="mb-4 text-lg font-semibold">Paiement rapide</h3>

              <form className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-slate-500">Élève</label>
                  <input className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel-alt)] px-3 py-2.5 outline-none" defaultValue="Josué Mbuyi" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm text-slate-500">Type</label>
                    <select className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel-alt)] px-3 py-2.5 outline-none">
                      <option>Frais scolaires</option>
                      <option>Frais de fonctionnement</option>
                      <option>Autres frais</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-slate-500">Montant</label>
                    <input className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel-alt)] px-3 py-2.5 outline-none" defaultValue="1800" />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-500">Période</label>
                  <input className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel-alt)] px-3 py-2.5 outline-none" defaultValue="Octobre 2026" />
                </div>

                <button type="button" className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white shadow-lg shadow-emerald-600/20">
                  Enregistrer le paiement
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
