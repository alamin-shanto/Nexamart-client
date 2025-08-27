"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserProfile {
  username: string;
  email: string;
  avatarUrl: string;
  memberSince: string;
  ordersCount: number;
  wishlistCount: number;
  reviewsCount: number;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!session) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/user/profile");
        if (!res.ok) throw new Error("Failed to fetch profile");

        const data: Partial<UserProfile> = await res.json();
        setUser({
          username: data.username || session.user?.name || "User",
          email: data.email || session.user?.email || "",
          avatarUrl:
            data.avatarUrl ||
            session.user?.image ||
            "/images/avatar-default.svg",
          memberSince: data.memberSince || new Date().toISOString(),
          ordersCount: data.ordersCount ?? 0,
          wishlistCount: data.wishlistCount ?? 0,
          reviewsCount: data.reviewsCount ?? 0,
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setUser({
          username: session.user?.name || "User",
          email: session.user?.email || "",
          avatarUrl: session.user?.image || "/images/avatar-default.svg",
          memberSince: new Date().toISOString(),
          ordersCount: 0,
          wishlistCount: 0,
          reviewsCount: 0,
        });
      }
    };

    fetchUserData();
  }, [session]);

  // Loading state
  if (status === "loading" || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <p className="text-gray-500 text-lg font-medium animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  // Not authenticated
  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <p className="text-gray-500 text-lg font-medium">
          You are not logged in.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 flex flex-col items-center border border-gray-200 relative overflow-hidden">
        {/* Animated Background Circles */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40 -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-40 -z-10 animate-pulse-slow" />

        {/* Profile Picture */}
        <div className="relative mb-6">
          <Image
            src={user.avatarUrl}
            alt={`${user.username}'s avatar`}
            width={128}
            height={128}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <button
            onClick={() => router.push("/profile/edit")}
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow-lg transition"
            title="Edit avatar"
          >
            ✎
          </button>
        </div>

        {/* User Info */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{user.username}</h2>
          <p className="text-gray-600 mt-1">{user.email}</p>
          <p className="text-sm text-gray-500 mt-1">
            Member since {new Date(user.memberSince).toLocaleDateString()}
          </p>
        </div>

        {/* Dynamic Stats Section */}
        <div className="w-full grid grid-cols-3 gap-4 mb-8 text-center">
          <div className="bg-blue-100 rounded-xl p-4 hover:scale-105 transition transform shadow-md">
            <p className="text-xl font-bold text-blue-600">
              {user.ordersCount}
            </p>
            <p className="text-sm text-gray-500">Orders</p>
          </div>
          <div className="bg-green-100 rounded-xl p-4 hover:scale-105 transition transform shadow-md">
            <p className="text-xl font-bold text-green-600">
              {user.wishlistCount}
            </p>
            <p className="text-sm text-gray-500">Wishlist</p>
          </div>
          <div className="bg-purple-100 rounded-xl p-4 hover:scale-105 transition transform shadow-md">
            <p className="text-xl font-bold text-purple-600">
              {user.reviewsCount}
            </p>
            <p className="text-sm text-gray-500">Reviews</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-4">
          <button
            onClick={() => router.push("/profile/edit")}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition shadow-lg"
          >
            Edit Profile
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 active:scale-95 transition shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
