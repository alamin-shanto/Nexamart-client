"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);

  // Shirt/Pants specific fields
  const [fabrics, setFabrics] = useState("");
  const [season, setSeason] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);

  // Mobile specific fields
  const [ram, setRam] = useState("");
  const [rom, setRom] = useState("");
  const [chipset, setChipset] = useState("");
  const [camera, setCamera] = useState("");

  // Image Handling
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status !== "loading" && !session) router.push("/login");
  }, [session, status, router]);

  useEffect(() => {
    if (imageFile) setPreview(URL.createObjectURL(imageFile));
    else if (imageUrl) setPreview(imageUrl);
    else setPreview(null);
  }, [imageFile, imageUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImageFile(e.target.files[0]);
    setImageUrl("");
  };

  const toggleSizeSelection = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) return toast.error("Please select a category");

    // Validate category-specific fields
    if (
      (category === "Shirt" || category === "Pants") &&
      (!fabrics || !season || sizes.length === 0)
    ) {
      return toast.error("Please fill all clothing fields");
    }
    if (category === "Mobile" && (!ram || !rom || !chipset || !camera)) {
      return toast.error("Please fill all mobile fields");
    }

    setLoading(true);

    type ProductPayload = {
      category: string;
      name: string;
      price: number;
      fabrics?: string;
      season?: string;
      sizes?: string[];
      ram?: string;
      rom?: string;
      chipset?: string;
      camera?: string;
    };

    const payload: ProductPayload = { category, name, price };

    if (category === "Shirt" || category === "Pants") {
      payload.fabrics = fabrics;
      payload.season = season;
      payload.sizes = sizes;
    } else if (category === "Mobile") {
      payload.ram = ram;
      payload.rom = rom;
      payload.chipset = chipset;
      payload.camera = camera;
    }

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(
          key,
          Array.isArray(value) ? JSON.stringify(value) : String(value)
        );
      }
    });

    if (imageFile) formData.append("image", imageFile);
    else if (imageUrl) formData.append("imageUrl", imageUrl);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast.success("Product added successfully!");
      router.push("/products");
    } else {
      toast.error("Failed to add product");
    }
    setLoading(false);
  };

  if (status === "loading" || !session)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-8 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">
          Add New Product
        </h2>

        {/* Category Selector */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-3 rounded-2xl focus:ring-2 focus:ring-yellow-400"
          required
        >
          <option value="">Select Category</option>
          <option value="Shirt">Shirt</option>
          <option value="Pants">Pants</option>
          <option value="Mobile">Mobile Phone</option>
        </select>

        {/* Common Fields */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="border border-gray-300 p-3 rounded-2xl focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
          className="border border-gray-300 p-3 rounded-2xl focus:ring-2 focus:ring-yellow-400"
          required
          min={0}
        />

        {/* Conditional Fields */}
        {(category === "Shirt" || category === "Pants") && (
          <>
            <input
              value={fabrics}
              onChange={(e) => setFabrics(e.target.value)}
              placeholder="Fabrics (e.g., Cotton, Denim)"
              className="border border-gray-300 p-3 rounded-2xl"
              required
            />
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="border border-gray-300 p-3 rounded-2xl"
              required
            >
              <option value="">Select Season</option>
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
            </select>
            <div>
              <p className="font-medium mb-2">Select Available Sizes:</p>
              <div className="flex gap-3 flex-wrap">
                {["S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSizeSelection(s)}
                    className={`px-4 py-2 rounded-xl border ${
                      sizes.includes(s)
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-100 text-gray-700"
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
              className="border border-gray-300 p-3 rounded-2xl"
              required
            />
            <input
              value={rom}
              onChange={(e) => setRom(e.target.value)}
              placeholder="ROM/Storage (e.g., 128GB)"
              className="border border-gray-300 p-3 rounded-2xl"
              required
            />
            <input
              value={chipset}
              onChange={(e) => setChipset(e.target.value)}
              placeholder="Chipset (e.g., Snapdragon 8 Gen 2)"
              className="border border-gray-300 p-3 rounded-2xl"
              required
            />
            <input
              type="number"
              value={camera}
              onChange={(e) => setCamera(e.target.value)}
              placeholder="Camera (MP)"
              className="border border-gray-300 p-3 rounded-2xl"
              required
            />
          </>
        )}

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">
            Upload Image or Enter URL
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded-xl cursor-pointer"
          />
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setImageFile(null);
            }}
            className="border border-gray-300 p-3 rounded-2xl"
          />
          {preview && (
            <div className="w-48 h-48 mt-2 rounded-xl border border-gray-200 overflow-hidden bg-gray-100 relative">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 text-white font-bold py-3 rounded-2xl hover:bg-yellow-600 transition duration-300 shadow-lg"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
