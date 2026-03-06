import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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

  async function signOutAction() {
    "use server";
    const serverSupabase = await createSupabaseServerClient();
    if (serverSupabase) {
      await serverSupabase.auth.signOut();
    }
    redirect("/login");
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <h1 className="font-[family-name:var(--font-source-serif)] text-4xl text-slate-900">
          Moj nalog
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Podaci naloga i status pristupa portalu.
        </p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Ime i prezime
            </dt>
            <dd className="mt-2 text-slate-900">
              {profile?.full_name || "Nije uneto"}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Email
            </dt>
            <dd className="mt-2 text-slate-900">
              {profile?.email || user.email || "N/A"}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Deklaracija zdravstvenog radnika
            </dt>
            <dd className="mt-2 text-slate-900">
              {profile?.declared_medical ? "Da" : "Ne"}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status stručnog pristupa
            </dt>
            <dd className="mt-2 capitalize text-slate-900">
              {profile?.medical_status || "none"}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/portal">Portal</Link>
          </Button>
          <form action={signOutAction}>
            <Button type="submit" variant="outline">
              Odjava
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
