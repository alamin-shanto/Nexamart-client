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
          setProducts(data?.products || []); // make sure to pick the array
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

  if (loading) return <Spinner />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
