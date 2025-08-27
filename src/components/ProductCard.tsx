"use client";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300">
      <div className="relative w-full h-60">
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover w-full h-full"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      <div className="p-5 flex flex-col gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
          {product.name}
        </h2>
        <p className="text-yellow-500 font-semibold text-lg">
          ${product.price} $
        </p>

        <Link
          href={`/products/${product._id}`}
          className="mt-3 inline-block text-center bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-xl transition-colors shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
