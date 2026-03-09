"use client";

import { FormEvent, useMemo, useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

type EditorialFormValues = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

type EditorialFormErrors = Partial<Record<keyof EditorialFormValues, string>>;

const INITIAL_VALUES: EditorialFormValues = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

function validate(values: EditorialFormValues): EditorialFormErrors {
  const errors: EditorialFormErrors = {};

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
    <div className="flex flex-col space-y-3">
      <label className="text-[11px] font-black uppercase tracking-[0.25em] text-[#00344d]/60">
        {label}
        {required ? <span className="text-[#00a3ad]"> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={cn(
          "w-full rounded-[1.5rem] border border-slate-100 bg-slate-50/50 px-8 py-5 text-[#00344d] placeholder:text-slate-400 outline-none transition-all focus:border-[#00a3ad] focus:ring-2 focus:ring-[#00a3ad]/20",
          error && "border-rose-300 ring-2 ring-rose-100",
        )}
      />
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}

export function EditorialContactForm({
  idPrefix = "editorial-contact-form",
  className,
}: {
  idPrefix?: string;
  className?: string;
}) {
  const [values, setValues] = useState<EditorialFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<EditorialFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  function updateField<K extends keyof EditorialFormValues>(
    key: K,
    value: EditorialFormValues[K],
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
    <form className={cn("space-y-10", className)} onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
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

      <FormInput
        id={`${idPrefix}-subject`}
        label="Naslov poruke"
        placeholder="O čemu želite da razgovaramo?"
        value={values.subject}
        onChange={(value) => updateField("subject", value)}
      />

      <div className="flex flex-col space-y-3">
        <label className="text-[11px] font-black uppercase tracking-[0.25em] text-[#00344d]/60">
          Vaša poruka <span className="text-[#00a3ad]">*</span>
        </label>
        <textarea
          id={`${idPrefix}-message`}
          rows={6}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Napišite vaše pitanje ovde..."
          aria-invalid={Boolean(errors.message)}
          className={cn(
            "w-full resize-none rounded-[2rem] border border-slate-100 bg-slate-50/50 px-8 py-6 text-[#00344d] outline-none transition-all focus:border-[#00a3ad] focus:ring-2 focus:ring-[#00a3ad]/20",
            errors.message && "border-rose-300 ring-2 ring-rose-100",
          )}
        />
        {errors.message ? <p className="text-xs text-rose-600">{errors.message}</p> : null}
      </div>

      <div className="space-y-2">
        <button
          type="submit"
          className="group inline-flex items-center gap-4 rounded-full bg-[#00344d] px-12 py-6 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-[#00344d]/10 transition-all hover:bg-[#00a3ad]"
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
