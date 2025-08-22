"use client";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <Image
        src={product.imageUrl || "/placeholder.png"}
        alt={product.name}
        width={300}
        height={200}
        className="rounded-md w-full object-cover mb-3"
      />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <Link
        href={`/products/${product._id}`}
        className="text-blue-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}
