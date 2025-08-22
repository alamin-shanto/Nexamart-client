import clientPromise from "@/library/mongodb";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("productsDB");
  const products = await db.collection("products").find({}).toArray();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
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
}
