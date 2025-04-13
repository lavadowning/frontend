import CartClient from "@/lib/CartClient";

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <CartClient />
    </div>
  );
}
