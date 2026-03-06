import Link from "next/link";
import { redirect } from "next/navigation";
import { BookMarked, Download, Microscope, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function StrucniPortalPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/portal/strucni");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("medical_status")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.medical_status !== "approved") {
    redirect("/portal");
  }

  return (
    <PageShell
      title="Stručni portal"
      subtitle="Verifikovana sekcija za zdravstvene radnike sa centralizovanim stručnim materijalima, preporukama i alatima za rad sa pacijentima."
      eyebrow="Medical only"
      actions={
        <>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            <ShieldCheck className="size-4" />
            Pristup odobren
          </div>
          <Button asChild variant="outline">
            <Link href="/portal">Nazad na portal</Link>
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <BookMarked className="size-5 text-sky-700" />
            <h2 className="mt-3 text-lg font-semibold text-slate-900">Klinički vodiči</h2>
            <p className="mt-2 text-sm text-slate-600">
              Struktuirani vodiči za stomu, rane i kontinenciju.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <Microscope className="size-5 text-sky-700" />
            <h2 className="mt-3 text-lg font-semibold text-slate-900">Stručni resursi</h2>
            <p className="mt-2 text-sm text-slate-600">
              Materijali za edukaciju tima i standardizaciju procesa nege.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <Download className="size-5 text-sky-700" />
            <h2 className="mt-3 text-lg font-semibold text-slate-900">Preuzimanja</h2>
            <p className="mt-2 text-sm text-slate-600">
              Predlošci i dokumenti za praktičnu upotrebu u radu sa pacijentima.
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Napomena</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Ova sekcija je zaštićena i namenjena isključivo verifikovanim zdravstvenim
            radnicima. Sadržaj ostaje odvojen od javnog CMS sloja i ne skladišti se u
            Sanity-u.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
