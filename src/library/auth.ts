import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // Your credentials logic
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role; // attach role from DB
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
  },
};
