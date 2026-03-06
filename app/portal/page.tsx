import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, CircleCheck, FileText, ShieldAlert, Users } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function statusLabel(status: string | null | undefined) {
  switch (status) {
    case "approved":
      return "Odobren";
    case "pending":
      return "Na čekanju";
    case "rejected":
      return "Odbijen";
    default:
      return "Bez stručnog pristupa";
  }
}

export default async function PortalPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/portal");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("medical_status, declared_medical")
    .eq("id", user.id)
    .maybeSingle();

  const medicalStatus = profile?.medical_status ?? "none";

  return (
    <PageShell
      title="Portal"
      subtitle="Centralno mesto za korisničke informacije, dokumentaciju i pristup dodatnim stručnim sadržajima."
      eyebrow="Za prijavljene korisnike"
      actions={
        <>
          <Button asChild>
            <Link href="/portal/strucni">Stručni portal</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/nalog">Moj nalog</Link>
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <Alert>
            <AlertTitle>Status stručnog pristupa: {statusLabel(medicalStatus)}</AlertTitle>
            <AlertDescription>
              Stručna sekcija /portal/strucni je dostupna isključivo korisnicima sa
              statusom <strong>approved</strong>.
            </AlertDescription>
          </Alert>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <FileText className="size-5 text-sky-700" />
            <h2 className="mt-3 text-lg font-semibold text-slate-900">Dokumentacija</h2>
            <p className="mt-2 text-sm text-slate-600">
              Praktični vodiči i informativni dokumenti za pacijente i negovatelje.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <BookOpen className="size-5 text-sky-700" />
            <h2 className="mt-3 text-lg font-semibold text-slate-900">Edukacija</h2>
            <p className="mt-2 text-sm text-slate-600">
              Struktuirani edukativni materijali usklađeni sa TT Medik programima.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <Users className="size-5 text-sky-700" />
            <h2 className="mt-3 text-lg font-semibold text-slate-900">Podrška</h2>
            <p className="mt-2 text-sm text-slate-600">
              Kontakt i smernice za saradnju sa stručnim timom.
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Status pristupa</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <CircleCheck className="mt-0.5 size-4 text-emerald-600" />
              Osnovni portal je aktivan za sve prijavljene korisnike.
            </li>
            <li className="flex items-start gap-2">
              {medicalStatus === "approved" ? (
                <CircleCheck className="mt-0.5 size-4 text-emerald-600" />
              ) : (
                <ShieldAlert className="mt-0.5 size-4 text-amber-600" />
              )}
              Stručni sadržaj je uslovljen statusom verifikacije.
            </li>
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
