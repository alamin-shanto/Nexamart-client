"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center py-20 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to NexaMart</h1>
      <p className="text-lg mb-8">
        Discover and manage amazing products with ease.
      </p>
      <Link
        href="/products"
        className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        Explore Products
      </Link>
    </section>
  );
}
