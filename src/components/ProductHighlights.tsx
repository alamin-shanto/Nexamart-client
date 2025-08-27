"use client";
import useSWR from "swr";
import Spinner from "./Spinner";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data || []);

export default function ProductHighlights() {
  const { data, error, isLoading } = useSWR<Product[]>(
    "/api/products",
    fetcher
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <p className="text-red-500 text-center py-10">Failed to load products.</p>
    );

  if (!data || data.length === 0)
    return <p className="text-center py-10">No products available.</p>;

  // Group products by category and take last 3 added products
  const categories: ("Shirt" | "Pants" | "Mobile")[] = [
    "Shirt",
    "Pants",
    "Mobile",
  ];

  const groupedProducts = categories.map((cat) => ({
    category: cat,
    items: data
      .filter((p) => p.category === cat)
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime; // newest first
      })
      .slice(0, 3),
  }));

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12 text-center">
        Highlighted Products
      </h2>

      {groupedProducts.map(({ category, items }) => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-bold text-yellow-500 mb-6">
            {category}
          </h3>

          {items.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">
              No {category.toLowerCase()} available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {items.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
