import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/library/mongodb";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, error: "Invalid ID" },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("NexaMart");

    const product = await db
      .collection("Products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );
    }

    const safeProduct = {
      ...product,
      _id: product._id.toString(),
      price:
        typeof product.price === "object" && "$numberInt" in product.price
          ? parseInt(product.price.$numberInt)
          : product.price,
      createdAt: product.createdAt
        ? new Date(product.createdAt).toISOString()
        : null,
    };

    return NextResponse.json({ success: true, data: safeProduct });
  } catch (err) {
    console.error("GET /products/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
