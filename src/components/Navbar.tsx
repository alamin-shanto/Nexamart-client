"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
  ];

  const authItems = session
    ? [
        { href: "/dashboard/add-product", label: "Add Product" },
        { href: "/profile", label: "Profile" },
      ]
    : [{ href: "/login", label: "Login" }];

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition"
        >
          NexaMart
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center">
          {navItems.concat(authItems).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative px-2 py-1 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "text-yellow-400 font-semibold"
                    : "text-gray-200 hover:text-yellow-300"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Logout button if logged in */}
          {session && (
            <button
              onClick={() => signOut()}
              className="ml-4 bg-gray-700 text-white px-4 py-1 rounded-lg font-semibold hover:bg-gray-600 transition"
            >
              Logout
            </button>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-200 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg rounded-b-lg">
          <ul className="flex flex-col gap-3 p-4">
            {navItems.concat(authItems).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? "text-yellow-400 font-semibold"
                      : "text-gray-200 hover:text-yellow-300"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Logout button for mobile */}
            {session && (
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="mt-2 w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
