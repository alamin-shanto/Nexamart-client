import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// --- TypeScript augmentation ---
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      name: string;
      email?: string | null;
    };
  }

  interface User {
    id: string;
    role?: string;
    name: string;
    email?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    role?: string;
  }
}

// --- Auth options ---
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role ?? token.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = token.role;
      }
      return session;
    },
  },

  session: { strategy: "jwt" },

  pages: { signIn: "/login", error: "/login" },
};

// --- Export handler ---
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
