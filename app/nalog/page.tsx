import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck, ShieldX, UserRoundCheck } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function medicalStatusUi(status: string | null | undefined) {
  switch (status) {
    case "approved":
      return {
        label: "Odobren",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        description: "Imate pristup stručnoj sekciji /portal/strucni.",
      };
    case "pending":
      return {
        label: "Na čekanju",
        className: "bg-amber-50 text-amber-700 border-amber-200",
        description:
          "Deklaracija je poslata. Administratorska potvrda je potrebna za stručni sadržaj.",
      };
    case "rejected":
      return {
        label: "Odbijen",
        className: "bg-rose-50 text-rose-700 border-rose-200",
        description:
          "Trenutno nemate pristup stručnoj sekciji. Kontaktirajte podršku za dodatne informacije.",
      };
    default:
      return {
        label: "Bez stručnog pristupa",
        className: "bg-slate-100 text-slate-700 border-slate-200",
        description:
          "Imate pristup korisničkom portalu, ali stručni sadržaj nije odobren.",
      };
  }
}

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/nalog");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, declared_medical, medical_status")
    .eq("id", user.id)
    .maybeSingle();
  const statusUi = medicalStatusUi(profile?.medical_status);

  async function signOutAction() {
    "use server";
    const serverSupabase = await createSupabaseServerClient();
    if (serverSupabase) {
      await serverSupabase.auth.signOut();
    }
    redirect("/login");
  }

  return (
    <PageShell
      title="Moj nalog"
      subtitle="Pregled naloga, status verifikacije i dostupni nivoi pristupa."
      eyebrow="Korisnički panel"
      contentClassName="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
      actions={
        <>
          <Button asChild>
            <Link href="/portal">Portal</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/portal/strucni">Stručni portal</Link>
          </Button>
          <form action={signOutAction}>
            <Button type="submit" variant="outline">
              Odjava
            </Button>
          </form>
        </>
      }
    >
      <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Ime i prezime
            </dt>
            <dd className="mt-2 text-slate-900">{profile?.full_name || "Nije uneto"}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</dt>
            <dd className="mt-2 break-all text-slate-900">{profile?.email || user.email || "N/A"}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Deklaracija zdravstvenog radnika
            </dt>
            <dd className="mt-2 text-slate-900">{profile?.declared_medical ? "Da" : "Ne"}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status stručnog pristupa
            </dt>
            <dd className="mt-2">
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusUi.className}`}
              >
                {statusUi.label}
              </span>
            </dd>
          </div>
        </dl>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          {statusUi.description}
          <p className="mt-2 text-xs text-slate-500">
            Napomena: potvrda checkbox-a pri registraciji predstavlja samo deklaraciju i ne
            aktivira automatski stručni pristup.
          </p>
        </div>
      </div>

      <aside className="space-y-4">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Dostupan pristup
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <UserRoundCheck className="mt-0.5 size-4 text-emerald-600" />
              Korisnički portal /portal
            </li>
            <li className="flex items-start gap-2">
              {profile?.medical_status === "approved" ? (
                <ShieldCheck className="mt-0.5 size-4 text-emerald-600" />
              ) : (
                <ShieldX className="mt-0.5 size-4 text-amber-600" />
              )}
              Stručni portal /portal/strucni
            </li>
          </ul>
        </section>
      </aside>
    </PageShell>
  );
}
