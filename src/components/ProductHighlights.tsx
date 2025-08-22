"use client";
import useSWR from "swr";
import Spinner from "./Spinner";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductHighlights() {
  const { data, error, isLoading } = useSWR<Product[]>(
    "/api/products",
    fetcher
  );

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">Failed to load products.</p>;
  if (!data || data.length === 0) return <p>No products available.</p>;

  return (
    <section className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((product: Product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </section>
  );
}
