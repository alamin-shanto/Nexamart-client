"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import Image from "next/image";

type ProductCategory = "Shirt" | "Pants" | "Mobile";

interface ProductPayload {
  category: ProductCategory | "";
  name: string;
  price: number;
  quantity: number;
  fabrics?: string | null;
  season?: string | null;
  sizes?: string[];
  ram?: string | null;
  rom?: string | null;
  chipset?: string | null;
  camera?: string | null;
  imageUrl?: string | null;
  imageBase64?: string;
}

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [category, setCategory] = useState<ProductCategory | "">("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>(""); // empty string for better UX
  const [quantity, setQuantity] = useState<string>(""); // new field

  const [fabrics, setFabrics] = useState("");
  const [season, setSeason] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);

  const [ram, setRam] = useState("");
  const [rom, setRom] = useState("");
  const [chipset, setChipset] = useState("");
  const [camera, setCamera] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status !== "loading" && !session) router.push("/login");
  }, [session, status, router]);

  useEffect(() => {
    let objectUrl: string | null = null;
    if (imageFile) {
      objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);
    } else if (imageUrl) {
      setPreview(imageUrl);
    } else {
      setPreview(null);
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [imageFile, imageUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) setImageUrl("");
  };

  const toggleSizeSelection = (size: string) =>
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return toast.error("Please select a category");
    if (
      (category === "Shirt" || category === "Pants") &&
      (!fabrics || !season || sizes.length === 0)
    )
      return toast.error("Please fill all clothing fields");
    if (category === "Mobile" && (!ram || !rom || !chipset || !camera))
      return toast.error("Please fill all mobile fields");
    if (!price || !quantity)
      return toast.error("Please provide price and quantity");
    if (!imageFile && !imageUrl) return toast.error("Please provide an image");

    setLoading(true);

    try {
      const body: ProductPayload = {
        category,
        name,
        price: Number(price),
        quantity: Number(quantity),
        fabrics: fabrics || null,
        season: season || null,
        sizes,
        ram: ram || null,
        rom: rom || null,
        chipset: chipset || null,
        camera: camera || null,
        imageUrl: imageUrl || null,
      };

      if (imageFile) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(imageFile);
        });
        body.imageBase64 = base64;
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (res.ok) {
        toast.success("Product added successfully!");
        router.push("/products");
      } else {
        toast.error(data.error || "Failed to add product");
      }
    } catch (err) {
      toast.error("Network error: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || !session)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <p className="text-lg text-white animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-gray-900 bg-opacity-90 shadow-2xl rounded-3xl p-8 flex flex-col gap-6 backdrop-blur-md"
      >
        <h2 className="text-3xl font-extrabold text-white text-center">
          Add New Product
        </h2>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ProductCategory)}
          className="border border-gray-700 p-3 rounded-2xl focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white"
          required
        >
          <option value="">Select Category</option>
          <option value="Shirt">Shirt</option>
          <option value="Pants">Pants</option>
          <option value="Mobile">Mobile Phone</option>
        </select>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="border border-gray-700 p-3 rounded-2xl focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white"
          required
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border border-gray-700 p-3 rounded-2xl focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white"
          required
          min={0}
        />

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          className="border border-gray-700 p-3 rounded-2xl focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white"
          required
          min={0}
        />

        {(category === "Shirt" || category === "Pants") && (
          <>
            <input
              value={fabrics}
              onChange={(e) => setFabrics(e.target.value)}
              placeholder="Fabrics (e.g., Cotton, Denim)"
              className="border border-gray-700 p-3 rounded-2xl bg-gray-800 text-white"
              required
            />
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="border border-gray-700 p-3 rounded-2xl bg-gray-800 text-white"
              required
            >
              <option value="">Select Season</option>
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
            </select>
            <div>
              <p className="font-medium mb-2 text-white">Select Sizes:</p>
              <div className="flex gap-3 flex-wrap">
                {["S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSizeSelection(s)}
                    className={`px-4 py-2 rounded-xl border font-semibold ${
                      sizes.includes(s)
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {category === "Mobile" && (
          <>
            <input
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              placeholder="RAM (e.g., 8GB)"
              className="border border-gray-700 p-3 rounded-2xl bg-gray-800 text-white"
              required
            />
            <input
              value={rom}
              onChange={(e) => setRom(e.target.value)}
              placeholder="ROM/Storage (e.g., 128GB)"
              className="border border-gray-700 p-3 rounded-2xl bg-gray-800 text-white"
              required
            />
            <input
              value={chipset}
              onChange={(e) => setChipset(e.target.value)}
              placeholder="Chipset (e.g., Snapdragon 8 Gen 2)"
              className="border border-gray-700 p-3 rounded-2xl bg-gray-800 text-white"
              required
            />
            <input
              type="number"
              value={camera}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCamera(e.target.value)
              }
              placeholder="Camera (MP)"
              className="border border-gray-700 p-3 rounded-2xl bg-gray-800 text-white"
              required
            />
          </>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-white font-medium">
            Upload Image or Enter URL
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-700 p-2 rounded-xl cursor-pointer bg-gray-800 text-white"
          />
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setImageFile(null);
            }}
            className="border border-gray-700 p-3 rounded-2xl bg-gray-800 text-white"
          />
          {preview && (
            <div className="relative w-full h-64 mt-2 rounded-xl border border-gray-700 overflow-hidden bg-gray-800">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 text-black font-bold py-3 rounded-2xl hover:bg-yellow-600 transition duration-300 shadow-lg"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
