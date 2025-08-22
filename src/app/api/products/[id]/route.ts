import { NextResponse } from "next/server";

import { ObjectId } from "mongodb";
import clientPromise from "@/library/mongodb";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const client = await clientPromise;
  const db = client.db("productsDB");
  try {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(params.id) });
    if (!product)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}
