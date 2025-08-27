"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">NexaMart</h2>
          <p className="text-gray-400">
            Your trusted marketplace for quality products at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="hover:text-yellow-300 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-yellow-300 transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="hover:text-yellow-300 transition-colors"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-yellow-300 transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:support@nexamart.com"
              className="hover:text-yellow-300"
            >
              support@nexamart.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+1234567890" className="hover:text-yellow-300">
              +123 456 7890
            </a>
          </p>
          <p>Address: Boston, USA</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} NexaMart. All rights reserved.
      </div>
    </footer>
  );
}
