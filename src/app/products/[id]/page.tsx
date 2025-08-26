"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import Spinner from "@/components/Spinner";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;

        if (!res.ok) {
          console.error(
            "Failed to fetch product:",
            data?.error || res.statusText
          );
          setProduct(null);
        } else {
          setProduct(data?.data || null);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Spinner />;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="p-6 max-w-xl mx-auto border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="mb-2">{product.description}</p>
      <p className="font-semibold">Price: ${product.price}</p>
    </div>
  );
}
