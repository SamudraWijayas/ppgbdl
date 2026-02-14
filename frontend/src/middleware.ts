import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const isRoot = pathname === "/";
  const isAuth = pathname.startsWith("/auth");
  const isLoggedIn = !!session;

  // =====================
  // SUDAH LOGIN
  // =====================
  if (isLoggedIn) {
    // Jika ke "/" atau "/auth" → arahkan ke /home
    if (isRoot || isAuth) {
      return NextResponse.redirect(new URL("/home", req.url));
    }

    return NextResponse.next();
  }

  // =====================
  // BELUM LOGIN
  // =====================
  if (!isLoggedIn) {
    // Jika akses "/" → arahkan ke /kmm
    if (isRoot) {
      return NextResponse.redirect(new URL("/kmm", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
});
