import { NextResponse } from "next/server";
import clientPromise from "@/library/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId, Decimal128, Document } from "mongodb";

export const runtime = "nodejs";

// Serialize MongoDB fields safely
function serializeProduct(p: Document) {
  return {
    ...p,
    _id: p._id instanceof ObjectId ? p._id.toString() : p._id,
    price:
      p.price instanceof Decimal128
        ? parseFloat(p.price.toString())
        : Number(p.price) || 0,
    quantity:
      p.quantity instanceof Decimal128
        ? parseFloat(p.quantity.toString())
        : Number(p.quantity) || 0,
    createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : null,
  };
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("NexaMart");
    const products = await db.collection("Products").find().toArray();
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

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    // Basic validation
    if (!data.name || isNaN(Number(data.price)) || isNaN(Number(data.quantity)))
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

    if (!["Shirt", "Pants", "Mobile"].includes(data.category))
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });

    // Optional: enforce sizes for clothing
    if (
      (data.category === "Shirt" || data.category === "Pants") &&
      (!Array.isArray(data.sizes) || data.sizes.length === 0)
    )
      return NextResponse.json(
        { error: "Sizes are required for clothing" },
        { status: 400 }
      );

    const client = await clientPromise;
    const db = client.db("NexaMart");

    const product = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
      createdAt: new Date(),
      createdBy: session.user?.email || "unknown",
    };

    const result = await db.collection("Products").insertOne(product);

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
