import clientPromise from "@/library/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const runtime = "nodejs";

// GET: Fetch All Products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("productsDB");
    const products = await db.collection("products").find({}).toArray();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST: Add New Product (Admin Only)
export async function POST(request: Request) {
  try {
    // OPTIONAL: Restrict to Admins only
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, price } = body;

    if (!name || !description || typeof price !== "number") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("productsDB");
    const result = await db
      .collection("products")
      .insertOne({ name, description, price });

    return NextResponse.json(
      { _id: result.insertedId, name, description, price },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
