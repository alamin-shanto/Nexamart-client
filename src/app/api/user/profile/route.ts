import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { Session } from "next-auth";
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

export async function GET(req: NextRequest) {
  const session: Session | null = await getServerSession({
    req,
    ...authOptions,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const profile: UserProfile = {
    username: session.user.name || "",
    email: session.user.email || "",
    avatarUrl: session.user.image || "/images/avatar-default.svg",
    memberSince: new Date("2025-01-01").toISOString(),
    ordersCount: 0,
    wishlistCount: 0,
    reviewsCount: 0,
  };

  return NextResponse.json(profile);
}
