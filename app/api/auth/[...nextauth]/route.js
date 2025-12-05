import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "../../../lib/actions";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        // 1. Unboxing data email dan password
        const email = credentials.email;
        const password = credentials.password;

        // 2. cari user berdasarkan emailnya
        const user = await getUserByEmail(email);

        if (!user) return null;

        // 3. mengcompare password
        const isValid = await compare(password, user.password);

        if (!isValid) return null;

        // 4. return users ke session (TAMBAHKAN SEMUA DATA)
        return {
          id: user.id,
          email: user.email,
          name: user.username,
          role: user.role,
          username: user.username,
          profile_picture: user.profile_picture,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
  
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.profile_picture = user.profile_picture;
      }
      return token;
    },
    async session({ session, token }) {

      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.profile_picture = token.profile_picture;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
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
  ],
};