"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent server/client mismatch

  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        enableSystem
        defaultTheme="system"
        disableTransitionOnChange
      >
        <Navbar />
        {children}
        <Toaster position="top-right" />
        <Footer />
      </ThemeProvider>
    </SessionProvider>
  );
}
