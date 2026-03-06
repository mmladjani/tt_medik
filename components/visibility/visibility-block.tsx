import type { ReactNode } from "react";
import { getViewerAccess } from "@/lib/viewer-access";

type Visibility = "public" | "logged_in" | "medical_only";

export async function VisibilityBlock({
  visibility,
  children,
}: {
  visibility: Visibility;
  children: ReactNode;
}) {
  if (visibility === "public") {
    return <>{children}</>;
  }

  const access = await getViewerAccess();

  if (visibility === "logged_in" && !access.isLoggedIn) {
    return null;
  }

  if (visibility === "medical_only" && access.medicalStatus !== "approved") {
    return null;
  }

  return <>{children}</>;
}

export async function LoggedInOnly({
  children,
}: {
  children: ReactNode;
}) {
  return <VisibilityBlock visibility="logged_in">{children}</VisibilityBlock>;
}

export async function MedicalOnly({
  children,
}: {
  children: ReactNode;
}) {
  return <VisibilityBlock visibility="medical_only">{children}</VisibilityBlock>;
}
