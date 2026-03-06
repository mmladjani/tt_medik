import Link from "next/link";
import { redirect } from "next/navigation";
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
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <h1 className="font-[family-name:var(--font-source-serif)] text-4xl text-slate-900">
          Portal
        </h1>
        <p className="mt-2 text-slate-600">
          Sadržaj portala je dostupan prijavljenim korisnicima.
        </p>

        <Alert className="mt-6">
          <AlertTitle>Status stručnog pristupa: {statusLabel(medicalStatus)}</AlertTitle>
          <AlertDescription>
            Stručna sekcija `/portal/strucni` je dostupna isključivo korisnicima
            sa statusom <strong>approved</strong>.
          </AlertDescription>
        </Alert>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/portal/strucni">Stručni portal</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/nalog">Moj nalog</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
