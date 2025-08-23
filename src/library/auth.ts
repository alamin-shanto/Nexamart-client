import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend NextAuth types

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === "admin" &&
          credentials?.password === "1234"
        ) {
          return { id: "1", name: "Admin", role: "admin" };
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.sub as string) ?? "";
        session.user.role = (token.role as string) ?? "user";
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};
