import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawNext = params.next;
  const nextPath =
    typeof rawNext === "string" && rawNext.startsWith("/") ? rawNext : "/nalog";

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
      title="Prijava"
      description="Pristupite svom nalogu i portal sadržaju."
      footer={
        <p className="text-center text-sm text-slate-600">
          Nemate nalog?{" "}
          <Link href="/register" className="font-semibold text-sky-700 hover:text-sky-800">
            Registracija
          </Link>
        </p>
      }
    >
      <LoginForm nextPath={nextPath} />
    </AuthShell>
  );
}
