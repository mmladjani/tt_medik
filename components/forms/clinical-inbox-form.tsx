"use client";

import { FormEvent, useMemo, useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

type ClinicalInboxValues = {
  fullName: string;
  email: string;
  message: string;
};

type ClinicalInboxErrors = Partial<Record<keyof ClinicalInboxValues, string>>;

const INITIAL_VALUES: ClinicalInboxValues = {
  fullName: "",
  email: "",
  message: "",
};

function validate(values: ClinicalInboxValues): ClinicalInboxErrors {
  const errors: ClinicalInboxErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Unesite ime i prezime.";
  }

  if (!values.email.trim()) {
    errors.email = "Unesite email adresu.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = "Email adresa nije ispravna.";
  }

  if (!values.message.trim()) {
    errors.message = "Unesite poruku.";
  }

  return errors;
}

function FormInput({
  id,
  label,
  placeholder,
  type = "text",
  required = false,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "email";
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div className="group flex flex-col space-y-2">
      <label
        htmlFor={id}
        className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00344d]/60 transition-colors group-focus-within:text-[#00a3ad]"
      >
        {label} {required ? <span className="text-[#00a3ad]">*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={cn(
          "w-full rounded-[1.2rem] border border-slate-100 bg-slate-50 px-6 py-4 text-[#00344d] placeholder:text-slate-400 transition-all focus:border-[#00a3ad] focus:outline-none focus:ring-2 focus:ring-[#00a3ad]/20",
          error && "border-rose-300 ring-2 ring-rose-100",
        )}
      />
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}

export function ClinicalInboxForm({
  idPrefix = "clinical-inbox-form",
  className,
}: {
  idPrefix?: string;
  className?: string;
}) {
  const [values, setValues] = useState<ClinicalInboxValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ClinicalInboxErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  function updateField<K extends keyof ClinicalInboxValues>(
    key: K,
    value: ClinicalInboxValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitted(true);
    setValues(INITIAL_VALUES);
  }

  return (
    <form className={cn("space-y-8", className)} onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <FormInput
          id={`${idPrefix}-full-name`}
          label="Ime i prezime"
          placeholder="Unesite vaše ime"
          required
          value={values.fullName}
          onChange={(value) => updateField("fullName", value)}
          error={errors.fullName}
        />
        <FormInput
          id={`${idPrefix}-email`}
          label="Email adresa"
          placeholder="primer@email.rs"
          type="email"
          required
          value={values.email}
          onChange={(value) => updateField("email", value)}
          error={errors.email}
        />
      </div>

      <div className="group flex flex-col space-y-2">
        <label
          htmlFor={`${idPrefix}-message`}
          className="text-[11px] font-black uppercase tracking-[0.25em] text-[#00344d]/60 transition-colors group-focus-within:text-[#00a3ad]"
        >
          Vaša poruka <span className="text-[#00a3ad]">*</span>
        </label>
        <textarea
          id={`${idPrefix}-message`}
          rows={5}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Napišite vaše pitanje ili upit ovde..."
          aria-invalid={Boolean(errors.message)}
          className={cn(
            "w-full resize-none rounded-[1.5rem] border border-slate-100 bg-slate-50 px-6 py-4 text-[#00344d] placeholder:text-slate-400 transition-all focus:border-[#00a3ad] focus:outline-none focus:ring-2 focus:ring-[#00a3ad]/20",
            errors.message && "border-rose-300 ring-2 ring-rose-100",
          )}
        />
        {errors.message ? <p className="text-xs text-rose-600">{errors.message}</p> : null}
      </div>

      <div className="space-y-2">
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#00344d] px-10 py-5 font-bold uppercase tracking-widest text-white shadow-lg shadow-[#00344d]/10 transition-all duration-300 hover:bg-[#00a3ad]"
        >
          Pošalji poruku
          <Send
            size={18}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </button>
        {submitted ? (
          <p className="text-sm text-emerald-700">
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
