"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white/95 shadow-2xl rounded-3xl p-10 flex flex-col justify-between border border-gray-200 backdrop-blur-sm">
        {/* --- Title --- */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Create Account
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Join us and start your journey!
          </p>
        </div>

        {/* --- Error Alert --- */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg mb-4 text-center font-medium">
            {error}
          </div>
        )}

        {/* --- Form --- */}
        <form onSubmit={handleRegister} className="flex flex-col gap-5 flex-1">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            required
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 active:scale-95 transition mt-2"
          >
            Register
          </button>
        </form>

        {/* --- Divider --- */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* --- Google Sign-In --- */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/products" })}
          className="w-full flex justify-center items-center gap-3 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 active:scale-95 transition mb-4"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFFFFF"
              d="M24 9.5c3.54 0 6.7 1.22 9.18 3.6l6.83-6.83C35.39 2.58 29.96 0 24 0 14.64 0 6.57 5.43 2.54 13.38l7.91 6.14C12.46 13.1 17.77 9.5 24 9.5z"
            />
            <path
              fill="#FFFFFF"
              d="M46.08 24.5c0-1.55-.14-3.04-.39-4.5H24v9h12.53c-.55 2.96-2.2 5.47-4.68 7.17l7.46 5.8C43.14 38.18 46.08 31.8 46.08 24.5z"
            />
            <path
              fill="#FFFFFF"
              d="M10.45 28.52A14.5 14.5 0 0 1 9.5 24c0-1.57.27-3.08.76-4.52L2.35 13.3C.83 16.24 0 19.48 0 23c0 3.52.83 6.76 2.35 9.7l8.1-4.18z"
            />
            <path
              fill="#FFFFFF"
              d="M24 48c6.48 0 11.9-2.14 15.87-5.83l-7.46-5.8C30.08 38.18 27.1 39.5 24 39.5c-6.23 0-11.54-3.6-13.55-8.72l-8.1 4.18C6.57 42.57 14.64 48 24 48z"
            />
          </svg>
          Sign up with Google
        </button>

        {/* --- Footer --- */}
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
