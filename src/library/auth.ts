import type { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

// --- Type augmentation for Session ---
declare module "next-auth" {
  interface Session extends DefaultSession {
    // Add custom properties here instead of redeclaring 'user'
    id?: string;
    role?: string;
  }

  interface User {
    id: string;
    role?: string;
  }
}

// --- NextAuth configuration ---
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

    async session({
      session,
      token,
    }): Promise<DefaultSession & { id: string; role?: string }> {
      return {
        ...session,
        id: token.sub ?? "",
        role: token.role ?? "user",
      };
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
