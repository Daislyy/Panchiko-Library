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

 
    if (pathname === "/dashboard") {
    
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard_admin/:path*",
    "/profile",
    "/borrow/:path*",
  ],
};
