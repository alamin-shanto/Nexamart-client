"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import Spinner from "@/components/Spinner";
import Image from "next/image";

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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <Spinner />
      </div>
    );

  if (!product)
    return (
      <p className="p-6 text-center text-white bg-black rounded-xl shadow-lg">
        Product not found
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col gap-6 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
      {/* Product Image */}
      {product.imageUrl ? (
        <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-inner">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>
      ) : (
        <div className="w-full h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-500">
          No Image Available
        </div>
      )}

      {/* Product Info */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          {product.name}
        </h1>
        {product.category && (
          <p className="text-gray-500 dark:text-gray-300 font-medium">
            Category: {product.category}
          </p>
        )}

        <div className="flex flex-wrap gap-2 text-gray-700 dark:text-gray-300">
          {product.sizes && product.sizes.length > 0 && (
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-600 rounded-full text-sm font-semibold">
              Sizes: {product.sizes.join(", ")}
            </span>
          )}
          {product.fabrics && (
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-600 rounded-full text-sm font-semibold">
              Fabrics: {product.fabrics}
            </span>
          )}
          {product.season && (
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-600 rounded-full text-sm font-semibold">
              Season: {product.season}
            </span>
          )}
        </div>

        {product.ram && product.rom && (
          <p className="text-gray-700 dark:text-gray-300">
            RAM: {product.ram}, ROM: {product.rom}
          </p>
        )}
        {product.chipset && (
          <p className="text-gray-700 dark:text-gray-300">
            Chipset: {product.chipset}
          </p>
        )}
        {product.camera && (
          <p className="text-gray-700 dark:text-gray-300">
            Camera: {product.camera} MP
          </p>
        )}

        <p className="text-2xl sm:text-3xl font-bold text-yellow-500 mt-4">
          ${product.price}
        </p>

        {product.quantity !== undefined && (
          <p className="text-gray-500 dark:text-gray-300">
            Quantity: {product.quantity}
          </p>
        )}
      </div>
    </div>
  );
}
