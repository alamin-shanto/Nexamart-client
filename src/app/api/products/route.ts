import { NextResponse } from "next/server";
import clientPromise from "@/library/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId, Decimal128, Document } from "mongodb";

export const runtime = "nodejs";

// Utility: Safely serialize MongoDB data
function serializeProduct(p: Document) {
  return {
    ...p,
    _id: p._id instanceof ObjectId ? p._id.toString() : p._id,
    price:
      p.price instanceof Decimal128
        ? parseFloat(p.price.toString())
        : Number(p.price) || 0,
    createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : null,
  };
}

// GET: Fetch all products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("NexaMart");

    const products = await db.collection("products").find().toArray();

    return NextResponse.json({
      success: true,
      data: products.map(serializeProduct),
    });
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Add new product (Authenticated)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session in POST /api/products:", session);

    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    if (!data.name || isNaN(Number(data.price))) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("NexaMart");

    const product = {
      name: data.name,
      description: data.description || "",
      price: Number(data.price),
      createdAt: new Date(),
      createdBy: session.user?.email || "unknown",
    };

    const result = await db.collection("products").insertOne(product);

    return NextResponse.json(
      {
        success: true,
        product: serializeProduct({ ...product, _id: result.insertedId }),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
