"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsPending(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Prijava nije uspela.",
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="email@primer.rs"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="login-password">Lozinka</Label>
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-sky-700 hover:text-sky-800"
          >
            Zaboravljena lozinka?
          </Link>
        </div>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="Unesite lozinku"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="h-10"
        />
      </div>

      {errorMessage ? (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ) : null}

      <Button type="submit" className="h-10 w-full" disabled={isPending}>
        {isPending ? "Prijava..." : "Prijava"}
      </Button>
    </form>
  );
}
