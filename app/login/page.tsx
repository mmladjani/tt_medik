import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <section className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center justify-center px-4 py-16 sm:px-6">
      <Card className="w-full max-w-md border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-source-serif)] text-3xl text-slate-900">
            Prijava
          </CardTitle>
          <CardDescription>
            Pristupite svom nalogu i portal sadržaju.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <LoginForm nextPath={nextPath} />
          <p className="text-center text-sm text-slate-600">
            Nemate nalog?{" "}
            <Link href="/register" className="font-semibold text-sky-700 hover:text-sky-800">
              Registracija
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
