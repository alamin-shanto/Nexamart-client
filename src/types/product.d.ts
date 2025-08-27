export interface Product {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  imageBase64?: string;
  category?: "Shirt" | "Pants" | "Mobile";
  fabrics?: string | null;
  season?: string | null;
  sizes?: string[];
  ram?: string | null;
  rom?: string | null;
  chipset?: string | null;
  camera?: string | null;
  quantity?: number | null;
  createdAt?: string | null;
}
