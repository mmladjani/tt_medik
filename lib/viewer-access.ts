import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface ViewerAccess {
  isLoggedIn: boolean;
  medicalStatus: "none" | "pending" | "approved" | "rejected";
  declaredMedical: boolean;
  fullName: string | null;
  email: string | null;
}

export const getViewerAccess = cache(async (): Promise<ViewerAccess> => {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      isLoggedIn: false,
      medicalStatus: "none",
      declaredMedical: false,
      fullName: null,
      email: null,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      isLoggedIn: false,
      medicalStatus: "none",
      declaredMedical: false,
      fullName: null,
      email: null,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("medical_status, declared_medical, full_name, email")
    .eq("id", user.id)
    .maybeSingle();

  const medicalStatus = (profile?.medical_status || "none") as
    | "none"
    | "pending"
    | "approved"
    | "rejected";

  return {
    isLoggedIn: true,
    medicalStatus,
    declaredMedical: Boolean(profile?.declared_medical),
    fullName: profile?.full_name || null,
    email: profile?.email || user.email || null,
  };
});
