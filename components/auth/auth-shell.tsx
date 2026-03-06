import type { ReactNode } from "react";
import Link from "next/link";
import { ShieldCheck, Stethoscope } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AuthShell({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="tt-container tt-section">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
        <article className="tt-surface order-2 p-6 sm:p-8 lg:order-1">
          <p className="tt-eyebrow">
            TT Medik nalog
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-source-serif)] text-4xl text-slate-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="tt-card p-4">
              <ShieldCheck className="size-5 text-sky-700" />
              <h2 className="mt-3 text-sm font-semibold text-slate-900">Sigurna autentikacija</h2>
              <p className="mt-1 text-sm text-slate-600">
                Prijava i registracija su podržane preko Supabase autentikacije.
              </p>
            </div>
            <div className="tt-card p-4">
              <Stethoscope className="size-5 text-sky-700" />
              <h2 className="mt-3 text-sm font-semibold text-slate-900">Kontrolisan stručni pristup</h2>
              <p className="mt-1 text-sm text-slate-600">
                Stručni sadržaj je dostupan tek nakon administratorske potvrde.
              </p>
            </div>
          </div>
        </article>

        <Card className="order-1 w-full border-slate-200/80 shadow-sm lg:order-2">
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-source-serif)] text-3xl text-slate-900">
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {children}
            {footer}
          </CardContent>
        </Card>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        Potrebna pomoć? Posetite <Link href="/kontakt" className="font-semibold text-sky-700 hover:text-sky-800">kontakt stranicu</Link>.
      </p>
    </section>
  );
}
