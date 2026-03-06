"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [declaredMedical, setDeclaredMedical] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsPending(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const normalizedEmail = email.trim().toLowerCase();
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            full_name: fullName.trim(),
            declared_medical: declaredMedical,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      const userId = data.user?.id;
      if (userId) {
        // Declaration only: this does not grant access to protected medical content.
        const { error: profileError } = await supabase.from("profiles").upsert(
          {
            id: userId,
            email: normalizedEmail,
            full_name: fullName.trim(),
            declared_medical: declaredMedical,
            medical_status: declaredMedical ? "pending" : "none",
          },
          { onConflict: "id" },
        );

        if (profileError) {
          // Signup still succeeds; profile may also be created by DB trigger.
          console.error("Profile upsert failed:", profileError.message);
        }
      }

      if (data.session) {
        router.replace("/nalog");
        router.refresh();
        return;
      }

      setSuccessMessage(
        "Nalog je kreiran. Proverite email i potvrdite registraciju pre prijave.",
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Registracija nije uspela.",
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="register-full-name">Ime i prezime</Label>
        <Input
          id="register-full-name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          autoComplete="name"
          placeholder="Ime i prezime"
          required
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email">Email</Label>
        <Input
          id="register-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          placeholder="email@primer.rs"
          required
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-password">Lozinka</Label>
        <Input
          id="register-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          required
          minLength={6}
          placeholder="Minimum 6 karaktera"
          className="h-10"
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-start gap-3">
          <Checkbox
            id="declared-medical"
            checked={declaredMedical}
            onCheckedChange={(value) => setDeclaredMedical(Boolean(value))}
          />
          <div className="space-y-1">
            <Label htmlFor="declared-medical">
              Potvrđujem da sam zdravstveni radnik
            </Label>
            <p className="text-xs text-slate-500">
              Ova izjava ne odobrava automatski pristup stručnoj sekciji.
            </p>
          </div>
        </div>
      </div>

      {errorMessage ? (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ) : null}

      {successMessage ? (
        <Alert>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      ) : null}

      <Button type="submit" className="h-10 w-full" disabled={isPending}>
        {isPending ? "Registracija..." : "Registruj se"}
      </Button>
    </form>
  );
}
