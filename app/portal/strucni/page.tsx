import Link from "next/link";
import { redirect } from "next/navigation";
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
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <h1 className="font-[family-name:var(--font-source-serif)] text-4xl text-slate-900">
          Stručni Portal
        </h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">
          Ovo je minimalna zaštićena sekcija dostupna samo korisnicima sa
          odobrenim medicinskim statusom. Ovde ubacite stručne materijale,
          vodiče i privatne resurse za zdravstvene radnike.
        </p>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/portal">Nazad na portal</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
