import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/dashboard_admin")) {
      if (token.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const protectedPaths = [
          "/dashboard",
          "/dashboard_admin",
          "/profile",
          "/borrow",
          "/my-borrows", 
        ];

        const isProtectedPath = protectedPaths.some((path) =>
          req.nextUrl.pathname.startsWith(path)
        );

        if (isProtectedPath) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard_admin/:path*",
    "/profile/:path*",
    "/borrow/:path*",
    "/my-borrows/:path*",
  ],
};
