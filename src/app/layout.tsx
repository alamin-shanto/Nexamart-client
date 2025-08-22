import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/Navbar";
import { Session } from "next-auth";

export const metadata = { title: "NextJS Products App" };

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class">
            <Navbar />
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
