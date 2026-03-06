import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getContactData, getHomepageData, getNavigationData } from "@/lib/content";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
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
  const [navigation, contact, homepage, supabase] = await Promise.all([
    getNavigationData(),
    getContactData(),
    getHomepageData(),
    createSupabaseServerClient(),
  ]);
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  return (
    <html lang="sr">
      <body
        className={`${manrope.variable} ${sourceSerif.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Preskoči na sadržaj
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader
            navigation={navigation.primary}
            contact={contact}
            accountHref={user ? "/nalog" : "/login"}
            accountLabel={user ? "Moj nalog" : "Nalog"}
          />
          <main id="main-content" className="flex-1">{children}</main>
          <SiteFooter contact={contact} programs={homepage.programs} />
        </div>
      </body>
    </html>
  );
}
