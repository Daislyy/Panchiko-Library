// app/api/auth/[...nextauth]/route.js

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
      // Tambahkan semua data user ke token saat login
      if (user) {
        token.id = user.id; // INI YANG PENTING!
        token.role = user.role;
        token.username = user.username;
        token.profile_picture = user.profile_picture;
      }
      return token;
    },
    async session({ session, token }) {
      // Tambahkan data dari token ke session
      if (token) {
        session.user.id = token.id; // INI YANG PENTING!
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.profile_picture = token.profile_picture;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
