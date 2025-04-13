"use client";
import { removeTokenCookie } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton({ onLogout }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await removeTokenCookie();
      onLogout?.();
      alert("You logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed. Try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-600 hover:underline"
    >
      Logout
    </button>
  );
}
