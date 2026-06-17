import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/api/auth");

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    const role = token.role;

    // Prevent redirect loops
    const isTrainerPath = pathname.startsWith("/trainer-dashboard");
    const isSporterPath = pathname.startsWith("/dashboard");

    if (role === "trainer" && isSporterPath && !isTrainerPath) {
      return NextResponse.redirect(new URL("/trainer-dashboard", req.url));
    }

    if (role === "sporter" && isTrainerPath && !isSporterPath) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/trainer-dashboard/:path*", "/account/:path*", "/directMessage/:path"],
};
