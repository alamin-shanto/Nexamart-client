"use client";

import Hero from "@/components/Hero";
import ProductHighlights from "@/components/ProductHighlights";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to NexaMart</h1>
      <Hero />
      <ProductHighlights />
    </main>
  );
}
