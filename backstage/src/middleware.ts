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
        `http://localhost:5000/api/maintenance`,
        { cache: "no-store" },
      );

      const data = await res.json();

      // admin tetap bisa masuk (optional)
      if (data.maintenanceMode && !adminRoles.includes(role)) {
        return NextResponse.redirect(new URL("/maintenance", req.url));
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
  if (pathname === "/" || pathname.startsWith("/auth")) {
    if (session) {
      return NextResponse.redirect(new URL(redirectByRole(), req.url));
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
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  if (pathname.startsWith("/area")) {
    if (!daerahRoles.includes(role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname === "/area") {
      return NextResponse.redirect(new URL("/area/dashboard", req.url));
    }
  }

  if (pathname.startsWith("/village")) {
    if (!desaRoles.includes(role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname === "/village") {
      return NextResponse.redirect(new URL("/village/dashboard", req.url));
    }
  }

  if (pathname.startsWith("/group")) {
    if (!kelompokRoles.includes(role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname === "/group") {
      return NextResponse.redirect(new URL("/group/dashboard", req.url));
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

// import { auth } from "@/auth";
// import { NextResponse } from "next/server";

// export default auth((req) => {
//   const { pathname } = req.nextUrl;
//   const session = req.auth;
//   const role = session?.user?.role ?? "";

//   const adminRoles = ["SUPERADMIN", "ADMIN"];
//   const daerahRoles = ["DAERAH", "SUBDAERAH"];
//   const desaRoles = ["DESA", "SUBDESA"];
//   const kelompokRoles = ["KELOMPOK", "SUBKELOMPOK"];

//   const redirectByRole = () => {
//     if (adminRoles.includes(role)) return "/admin/dashboard";
//     if (daerahRoles.includes(role)) return "/area/dashboard";
//     if (desaRoles.includes(role)) return "/village/dashboard";
//     if (kelompokRoles.includes(role)) return "/group/dashboard";
//     return "/dashboard";
//   };

//   // ================= PUBLIC & AUTH =================
//   if (
//     pathname === "/" ||
//     pathname === "/auth/login" ||
//     pathname === "/auth/register" ||
//     pathname.startsWith("/auth")
//   ) {
//     if (session) {
//       return NextResponse.redirect(new URL(redirectByRole(), req.url));
//     }
//     return NextResponse.next();
//   }

//   // ================= AUTH REQUIRED =================
//   if (!session) {
//     const url = new URL("/auth/login", req.url);
//     url.searchParams.set("callbackUrl", encodeURI(req.url));
//     return NextResponse.redirect(url);
//   }

//   // ================= ROLE GUARDS =================

//   // ADMIN
//   if (pathname.startsWith("/admin")) {
//     if (!adminRoles.includes(role)) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//     if (pathname === "/admin") {
//       return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//     }
//   }

//   // DAERAH
//   if (pathname.startsWith("/area")) {
//     if (!daerahRoles.includes(role)) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//     if (pathname === "/area") {
//       return NextResponse.redirect(new URL("/area/dashboard", req.url));
//     }
//   }

//   // DESA
//   if (pathname.startsWith("/village")) {
//     if (!desaRoles.includes(role)) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//     if (pathname === "/village") {
//       return NextResponse.redirect(new URL("/village/dashboard", req.url));
//     }
//   }

//   // KELOMPOK
//   if (pathname.startsWith("/group")) {
//     if (!kelompokRoles.includes(role)) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//     if (pathname === "/group") {
//       return NextResponse.redirect(new URL("/group/dashboard", req.url));
//     }
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     "/",
//     "/auth/:path*",
//     "/admin/:path*",
//     "/area/:path*",
//     "/village/:path*",
//     "/group/:path*",
//   ],
// };
