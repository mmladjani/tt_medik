import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const authPages = new Set(["/login", "/register", "/forgot-password"]);

function isProtectedPath(pathname: string): boolean {
  return pathname === "/nalog" || pathname === "/portal" || pathname.startsWith("/portal/");
}

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const pathname = request.nextUrl.pathname;

  if (isProtectedPath(pathname) && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (user && authPages.has(pathname)) {
    return NextResponse.redirect(new URL("/nalog", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/login", "/register", "/forgot-password", "/nalog", "/portal/:path*"],
};
