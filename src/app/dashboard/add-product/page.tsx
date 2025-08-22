"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) return <p>Loading...</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price }),
    });

    if (res.ok) {
      toast.success("Product added");
      router.push("/products");
    } else {
      toast.error("Failed to add product");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 flex flex-col gap-4"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border p-2 rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 rounded"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Price"
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
