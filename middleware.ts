// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authEdge } from "./lib/auth-edge";

const adminRoutes = ["/admin"];
const userRoutes = ["/dashboard"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session (Edge-safe)
  const session = await authEdge.getSession({ headers: request.headers });
  const user = session?.user;

  // Protect /dashboard/* and /admin/*
  if (
    userRoutes.some((r) => pathname.startsWith(r)) ||
    adminRoutes.some((r) => pathname.startsWith(r))
  ) {
    if (!user) return NextResponse.redirect(new URL("/sign-in", request.url));
    if (
      adminRoutes.some((r) => pathname.startsWith(r)) &&
      user.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/gallery", request.url));
    }
  }

  // If the admin try to go to the user page

  if (userRoutes.some((r) => pathname.startsWith(r))) {
    if (user?.role === "admin") {
      return NextResponse.redirect(new URL("/admin/settings", request.nextUrl));
    }
  }

  // Redirect logged-in users away from /sign-in or /sign-up
  if (authRoutes.some((r) => pathname.startsWith(r)) && user) {
    return NextResponse.redirect(new URL("/gallery", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/sign-in", "/sign-up"],
};
