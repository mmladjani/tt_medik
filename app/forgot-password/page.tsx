import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ForgotPasswordPage() {
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
      title="Reset lozinke"
      description="Unesite email adresu i poslaćemo Vam link za reset."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
