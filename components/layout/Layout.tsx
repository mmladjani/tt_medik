import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { ContactData, NavigationItem } from "@/lib/content";

export function Layout({
  navigation,
  contact,
  accountHref,
  accountLabel,
  isLoggedIn,
  medicalStatus,
  children,
}: {
  navigation: NavigationItem[];
  contact: ContactData;
  accountHref: string;
  accountLabel: string;
  isLoggedIn: boolean;
  medicalStatus: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        navigation={navigation}
        contact={contact}
        accountHref={accountHref}
        accountLabel={accountLabel}
        isLoggedIn={isLoggedIn}
        medicalStatus={medicalStatus}
      />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter contact={contact} />
    </div>
  );
}
