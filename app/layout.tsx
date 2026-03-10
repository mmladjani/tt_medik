import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Layout } from "@/components/layout/Layout";
import { getContactData, getNavigationData } from "@/lib/content";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TT Medik",
  description: "TT Medik - medicinski programi i podrška za pacijente",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navigation, contact, supabase] = await Promise.all([
    getNavigationData(),
    getContactData(),
    createSupabaseServerClient(),
  ]);
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const { data: profile } = user && supabase
    ? await supabase
        .from("profiles")
        .select("medical_status")
        .eq("id", user.id)
        .maybeSingle()
    : { data: null };
  const medicalStatus = profile?.medical_status ?? "none";

  return (
    <html lang="sr">
      <body className={`${manrope.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Preskoči na sadržaj
        </a>
        <Layout
          navigation={navigation.primary}
          contact={contact}
          accountHref={user ? "/nalog" : "/login"}
          accountLabel={user ? "Moj nalog" : "Nalog"}
          isLoggedIn={Boolean(user)}
          medicalStatus={medicalStatus}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
