"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/dashboard/add-product", label: "Add Product" },
    { href: "/login", label: "Login" },
  ];

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        NexaMart
      </Link>
      <ul className="flex gap-6">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`hover:text-yellow-300 transition ${
                pathname === item.href ? "text-yellow-400 font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
