"use client";

import { FormEvent, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ContactFormMode = "full" | "compact";

type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function validate(values: ContactFormValues, mode: ContactFormMode): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Unesite ime i prezime.";
  }

  if (!values.email.trim()) {
    errors.email = "Unesite email adresu.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = "Email adresa nije ispravna.";
  }

  if (mode === "full" && !values.phone.trim()) {
    errors.phone = "Unesite broj telefona.";
  }

  if (mode === "full" && !values.subject.trim()) {
    errors.subject = "Unesite naslov poruke.";
  }

  if (!values.message.trim()) {
    errors.message = "Unesite poruku.";
  }

  return errors;
}

export function ContactForm({
  mode = "full",
  submitLabel = "Pošalji poruku",
  idPrefix = "contact-form",
  className,
}: {
  mode?: ContactFormMode;
  submitLabel?: string;
  idPrefix?: string;
  className?: string;
}) {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  function updateField<K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(values, mode);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitted(true);
    setValues(initialValues);
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-full-name`}>Ime i prezime *</Label>
          <Input
            id={`${idPrefix}-full-name`}
            value={values.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            placeholder="Primer, Nikola Nikolić"
            aria-invalid={Boolean(errors.fullName)}
          />
          {errors.fullName ? (
            <p className="inline-flex items-center gap-1 text-xs text-rose-600">
              <AlertCircle className="size-3.5" />
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-email`}>Email *</Label>
          <Input
            id={`${idPrefix}-email`}
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="email@primer.rs"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? (
            <p className="inline-flex items-center gap-1 text-xs text-rose-600">
              <AlertCircle className="size-3.5" />
              {errors.email}
            </p>
          ) : null}
        </div>

        {mode === "full" ? (
          <>
            <div className="space-y-2">
              <Label htmlFor={`${idPrefix}-phone`}>Telefon *</Label>
              <Input
                id={`${idPrefix}-phone`}
                value={values.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="Broj telefona"
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone ? (
                <p className="inline-flex items-center gap-1 text-xs text-rose-600">
                  <AlertCircle className="size-3.5" />
                  {errors.phone}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${idPrefix}-subject`}>Naslov *</Label>
              <Input
                id={`${idPrefix}-subject`}
                value={values.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                placeholder="Naslov poruke"
                aria-invalid={Boolean(errors.subject)}
              />
              {errors.subject ? (
                <p className="inline-flex items-center gap-1 text-xs text-rose-600">
                  <AlertCircle className="size-3.5" />
                  {errors.subject}
                </p>
              ) : null}
            </div>
          </>
        ) : null}

        <div className={cn("space-y-2 sm:col-span-2")}>
          <Label htmlFor={`${idPrefix}-message`}>Poruka *</Label>
          <Textarea
            id={`${idPrefix}-message`}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Napišite poruku"
            rows={mode === "full" ? 6 : 5}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? (
            <p className="inline-flex items-center gap-1 text-xs text-rose-600">
              <AlertCircle className="size-3.5" />
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-3 pt-1">
        <Button type="submit" className="w-full sm:w-auto">
          {submitLabel}
        </Button>

        {submitted ? (
          <p className="inline-flex items-center gap-1 text-sm text-emerald-700">
            <CheckCircle2 className="size-4" />
            Poruka je spremna za slanje. Backend integracija će biti dodata uskoro.
          </p>
        ) : null}

        {hasErrors ? (
          <p className="text-xs text-slate-500">Polja označena zvezdicom su obavezna.</p>
        ) : null}
      </div>
    </form>
  );
}
