"use client";

import { useState } from "react";
import Link from "next/link";
import { register } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register({
        username: form.name,
        email: form.email,
        password: form.password,
      });
      alert("Account created successfully");
      router.push("/profile?authRefreshed=true");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col lg:flex-row flex-1">
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-16 py-10 lg:py-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center lg:text-left">
            Create an account
          </h2>
          <p className="text-gray-600 mb-6 text-center lg:text-left">
            Enter your details below
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-3 mb-3 rounded-md"
              required
            />
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

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-md transition hover:bg-red-600"
            >
              Create Account
            </button>
          </form>

          <button
            type="button"
            className="w-full flex items-center justify-center border py-3 mt-3 rounded-md"
          >
            <img
              src="https://wealthy-idea-ec9a86a949.media.strapiapp.com/google_8f9a43515e.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </button>

          <p className="text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-black underline">
              Log in
            </Link>
          </p>
        </div>

        <div className="w-full lg:w-1/2 bg-gray-100 flex justify-center items-center p-6">
          <img
            src="https://wealthy-idea-ec9a86a949.media.strapiapp.com/shopping_dbaaf6e783.png"
            alt="Shopping"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
