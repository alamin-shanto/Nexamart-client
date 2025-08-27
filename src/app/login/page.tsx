"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/products",
    });

    if (res?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/products");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-[400px] border border-gray-200 relative">
        {/* Subtle background accent */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-30 -z-10" />

        {/* --- Logo or Title --- */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Sign in to access your account
          </p>
        </div>

        {/* --- Error Alert --- */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4 text-center font-medium shadow-sm">
            {error}
          </div>
        )}

        {/* --- Login Form --- */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 active:scale-95 transition shadow-md"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Sign-In */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/products" })}
          className="w-full flex justify-center items-center gap-3 bg-gray-50 border border-gray-300 py-3 rounded-xl font-medium hover:shadow-lg hover:bg-gray-100 active:scale-95 transition"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.7 1.22 9.18 3.6l6.83-6.83C35.39 2.58 29.96 0 24 0 14.64 0 6.57 5.43 2.54 13.38l7.91 6.14C12.46 13.1 17.77 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.08 24.5c0-1.55-.14-3.04-.39-4.5H24v9h12.53c-.55 2.96-2.2 5.47-4.68 7.17l7.46 5.8C43.14 38.18 46.08 31.8 46.08 24.5z"
            />
            <path
              fill="#FBBC05"
              d="M10.45 28.52A14.5 14.5 0 0 1 9.5 24c0-1.57.27-3.08.76-4.52L2.35 13.3C.83 16.24 0 19.48 0 23c0 3.52.83 6.76 2.35 9.7l8.1-4.18z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.9-2.14 15.87-5.83l-7.46-5.8C30.08 38.18 27.1 39.5 24 39.5c-6.23 0-11.54-3.6-13.55-8.72l-8.1 4.18C6.57 42.57 14.64 48 24 48z"
            />
          </svg>
          <span className="text-gray-700">Sign in with Google</span>
        </button>

        {/* Extra Options */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
