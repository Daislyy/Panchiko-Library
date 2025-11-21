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

        // 4. return users ke session (TAMBAHKAN ROLE)
        return {
          id: user.id,
          email: user.email,
          name: user.username,
          role: user.role 
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Tambahkan role ke token jika user ada (saat login)
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Tambahkan role ke session dari token
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };