"use client";
import { signIn } from "next-auth/react";
export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded"
        onClick={() => signIn("google", { callbackUrl: "/products" })}
      >
        Sign in with Google
      </button>
    </div>
  );
}
