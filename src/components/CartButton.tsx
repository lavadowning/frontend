"use client";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ productId }: { productId: string }) {
  const router = useRouter();

  const getTokenFromCookies = (): string | null => {
    const match = document.cookie.match(/(^|;) ?token=([^;]*)/);
    return match ? match[2] : null;
  };

  const handleAddToCart = () => {
    const isLoggedIn = getTokenFromCookies();

    if (!isLoggedIn) {
      alert("Please log in to add products to cart.");
      router.push("/login");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart];
    const index = updatedCart.findIndex((item: any) => item.id === productId);

    if (index !== -1) {
      updatedCart[index].count += 1;
    } else {
      updatedCart.push({ id: productId, count: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Product added to cart!");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
    >
      Add to Cart
    </button>
  );
}
