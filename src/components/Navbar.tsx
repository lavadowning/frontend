"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

export default function Navbar({ user, refreshAuth }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-10 border-b border-gray-200 text-black font-semibold relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-3xl">Exclusive</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-12 text-xl">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          {!user?.id && (
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
          )}
        </ul>

        <ul className="hidden md:flex space-x-6 text-sm items-center">
          <li>
            <input
              type="text"
              placeholder="Search products..."
              className="text-sm px-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </li>
          <li>
            <Link href="/cart">
              <ShoppingCart size={24} className="cursor-pointer" />
            </Link>
          </li>
          {user?.id ? (
            <>
              <li>
                <Link href="/profile">
                  <User
                    size={32}
                    className="cursor-pointer bg-red-400 rounded-full text-neutral-50 p-1"
                  />
                </Link>
              </li>
              <li>
                <LogoutButton onLogout={refreshAuth} />
              </li>
            </>
          ) : null}
        </ul>

        {/* Burger Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(true)}>
          <Menu size={30} />
        </button>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-3/4 max-w-[300px] bg-white shadow-lg z-50 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <button
            className="absolute top-4 right-6 text-3xl"
            onClick={() => setIsOpen(false)}
          >
            <X size={30} />
          </button>

          <div className="flex flex-col items-start space-y-6 px-6 py-14">
            {user?.id ? (
              <>
                <Link href="/profile" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center space-x-2">
                    <User
                      size={32}
                      className="bg-red-400 rounded-full text-neutral-50 p-1"
                    />
                    <span>Profile</span>
                  </div>
                </Link>
                <LogoutButton
                  onLogout={() => {
                    setIsOpen(false);
                    refreshAuth();
                  }}
                />
              </>
            ) : null}

            <input
              type="text"
              placeholder="Search products..."
              className="text-sm px-4 py-2 border border-gray-300 rounded-md w-full"
            />

            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/shop" onClick={() => setIsOpen(false)}>
              Shop
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
            {!user?.id && (
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            )}
            <Link href="/cart" onClick={() => setIsOpen(false)}>
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
