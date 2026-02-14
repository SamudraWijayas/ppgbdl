import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth(async (req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const role = session?.user?.role ?? "";

  const adminRoles = ["SUPERADMIN", "ADMIN"];
  const daerahRoles = ["DAERAH", "SUBDAERAH"];
  const desaRoles = ["DESA", "SUBDESA"];
  const kelompokRoles = ["KELOMPOK", "SUBKELOMPOK"];

  // ================= MAINTENANCE CHECK =================

  // jangan redirect kalau sudah di halaman maintenance
  if (pathname !== "/maintenance") {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/maintenance`,
        { cache: "no-store" }
      );

      const data = await res.json();

      // admin tetap bisa masuk (optional)
      if (data.maintenanceMode && !adminRoles.includes(role)) {
        return NextResponse.redirect(
          new URL("/maintenance", req.url)
        );
      }
    } catch (error) {
      // kalau backend mati, lanjut saja
    }
  }

  // ================= ROLE REDIRECT =================

  const redirectByRole = () => {
    if (adminRoles.includes(role)) return "/admin/dashboard";
    if (daerahRoles.includes(role)) return "/area/dashboard";
    if (desaRoles.includes(role)) return "/village/dashboard";
    if (kelompokRoles.includes(role)) return "/group/dashboard";
    return "/dashboard";
  };

  // ================= PUBLIC & AUTH =================
  if (
    pathname === "/" ||
    pathname.startsWith("/auth")
  ) {
    if (session) {
      return NextResponse.redirect(
        new URL(redirectByRole(), req.url)
      );
    }
    return NextResponse.next();
  }

  // ================= AUTH REQUIRED =================
  if (!session) {
    const url = new URL("/auth/login", req.url);
    url.searchParams.set("callbackUrl", encodeURI(req.url));
    return NextResponse.redirect(url);
  }

  // ================= ROLE GUARDS =================

  if (pathname.startsWith("/admin")) {
    if (!adminRoles.includes(role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname === "/admin") {
      return NextResponse.redirect(
        new URL("/admin/dashboard", req.url)
      );
    }
  }

  if (pathname.startsWith("/area")) {
    if (!daerahRoles.includes(role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname === "/area") {
      return NextResponse.redirect(
        new URL("/area/dashboard", req.url)
      );
    }
  }

  if (pathname.startsWith("/village")) {
    if (!desaRoles.includes(role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname === "/village") {
      return NextResponse.redirect(
        new URL("/village/dashboard", req.url)
      );
    }
  }

  if (pathname.startsWith("/group")) {
    if (!kelompokRoles.includes(role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname === "/group") {
      return NextResponse.redirect(
        new URL("/group/dashboard", req.url)
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/admin/:path*",
    "/area/:path*",
    "/village/:path*",
    "/group/:path*",
  ],
};


// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { JWTExtended } from "./types/Auth";
// import { getToken } from "next-auth/jwt";
// import environment from "./config/environment";

// export async function middleware(request: NextRequest) {
//   const token: JWTExtended | null = await getToken({
//     req: request,
//     secret: environment.AUTH_SECRET,
//   });

//   const { pathname } = request.nextUrl;

//   const adminRoles = ["SUPERADMIN", "ADMIN"];
//   const daerahRoles = ["DAERAH", "SUBDAERAH"];
//   const desaRoles = ["DESA", "SUBDESA"];
//   const kelompokRoles = ["KELOMPOK", "SUBKELOMPOK"];

//   if (
//     pathname === "/" ||
//     pathname === "/auth/login" ||
//     pathname === "/auth/register"
//   ) {
//     if (token) {
//       const role = token?.user?.role ?? "";
//       if (adminRoles.includes(role)) {
//         return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//       } else if (daerahRoles.includes(role)) {
//         return NextResponse.redirect(new URL("/daerah/dashboard", request.url));
//       } else if (desaRoles.includes(role)) {
//         return NextResponse.redirect(new URL("/village/dashboard", request.url));
//       } else if (kelompokRoles.includes(role)) {
//         return NextResponse.redirect(
//           new URL("/group/dashboard", request.url)
//         );
//       }
//     }
//   }

//   // 🔒 Proteksi halaman ADMIN
//   if (pathname.startsWith("/admin")) {
//     if (!token) {
//       const url = new URL("/auth/login", request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }
//     if (!adminRoles.includes(token?.user?.role ?? "")) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     if (pathname === "/admin") {
//       return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//     }
//   }

//   // 🔒 Proteksi halaman DAERAH
//   if (pathname.startsWith("/daerah")) {
//     if (!token) {
//       const url = new URL("/auth/login", request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }
//     if (!daerahRoles.includes(token?.user?.role ?? "")) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     if (pathname === "/daerah") {
//       return NextResponse.redirect(new URL("/daerah/dashboard", request.url));
//     }
//   }

//   // 🔒 Proteksi halaman DESA
//   if (pathname.startsWith("/village")) {
//     if (!token) {
//       const url = new URL("/auth/login", request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }
//     if (!desaRoles.includes(token?.user?.role ?? "")) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     if (pathname === "/village") {
//       return NextResponse.redirect(new URL("/village/dashboard", request.url));
//     }
//   }

//   // 🔒 Proteksi halaman KELOMPOK
//   if (pathname.startsWith("/group")) {
//     if (!token) {
//       const url = new URL("/auth/login", request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }
//     if (!kelompokRoles.includes(token?.user?.role ?? "")) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     if (pathname === "/group") {
//       return NextResponse.redirect(new URL("/group/dashboard", request.url));
//     }
//   }
// }

// export const config = {
//   matcher: [
//     "/",
//     "/auth/:path*",
//     "/admin/:path*",
//     "/daerah/:path*",
//     "/village/:path*",
//     "/kelompok/:path*",
//   ],
// };
