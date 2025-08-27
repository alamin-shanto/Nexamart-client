// app/api/user/profile/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

interface UserProfile {
  username: string;
  email: string;
  avatarUrl: string;
  memberSince: string;
  ordersCount: number;
  wishlistCount: number;
  reviewsCount: number;
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = session.user;

  const profile: UserProfile = {
    username: user.name || "Anonymous",
    email: user.email || "",
    avatarUrl: user.image || "/images/avatar-default.svg",
    memberSince: new Date("2025-01-01").toISOString(),
    ordersCount: 0,
    wishlistCount: 0,
    reviewsCount: 0,
  };

  return NextResponse.json(profile);
}
