"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/Spinner";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;

        if (!res.ok) {
          console.error(
            "Failed to fetch products:",
            data?.error || res.statusText
          );
          setProducts([]);
        } else {
          setProducts(data?.data || []);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  if (products.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-6 space-y-4">
        <div className="text-7xl">📦</div> {/* Box emoji as placeholder */}
        <h2 className="text-3xl font-bold text-gray-700">
          No Products Available
        </h2>
        <p className="text-gray-500 max-w-xs">
          We’re sorry, there are currently no products to display. Please check
          back later.
        </p>
        <a
          href="/dashboard/add-product"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add a Product
        </a>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
