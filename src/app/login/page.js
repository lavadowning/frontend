"use client";

import Link from "next/link";
import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login({
        identifier: form.email,
        password: form.password,
      });
      router.push("/profile?authRefreshed=true");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col lg:flex-row flex-1">
        <div className="w-full lg:w-1/2 bg-gray-100 flex justify-center items-center p-6">
          <img
            src="http://localhost:1337/uploads/shopping_dbaaf6e783.png"
            alt="Shopping"
            className="w-full max-w-md"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-16 py-10 lg:py-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Log in to Exclusive
          </h2>
          <p className="text-gray-600 mb-6">Enter your details below</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email or Phone Number"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border p-3 mb-3 rounded-md"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border p-3 mb-3 rounded-md"
              required
            />

            {error && (
              <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
            )}

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-red-500 text-white py-3 px-6 rounded-md transition hover:bg-red-600"
              >
                Log In
              </button>

              <Link href="/forgot-password" className="text-red-500 text-sm">
                Forget Password?
              </Link>
            </div>
          </form>

          <p className="text-gray-600 text-center mt-4">
            Don't have account?{" "}
            <Link href="/signup" className="text-black underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
