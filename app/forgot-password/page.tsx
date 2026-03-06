import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <section className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center justify-center px-4 py-16 sm:px-6">
      <Card className="w-full max-w-md border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-source-serif)] text-3xl text-slate-900">
            Reset lozinke
          </CardTitle>
          <CardDescription>
            Unesite email adresu i poslaćemo Vam link za reset.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </section>
  );
}
