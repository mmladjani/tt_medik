import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function RegisterPage() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/nalog");
    }
  }

  return (
    <AuthShell
      title="Registracija"
      description="Kreirajte nalog za pristup sadržaju i portalu."
      footer={
        <p className="text-center text-sm text-slate-600">
          Već imate nalog?{" "}
          <Link href="/login" className="font-semibold text-sky-700 hover:text-sky-800">
            Prijava
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
