"use client";

import { useEffect, useState } from "react";
import { getCartProducts } from "@/lib/getProducts";
import Image from "next/image";
import Link from "next/link";
type Product = {
  documentId: string;
  name: string;
  price: number;
  image: { url: string };
  count: number;
};

type CartItem = {
  id: string;
  count: number;
};

export default function CartClient() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart: CartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    if (storedCart.length > 0) {
      getCartProducts(storedCart).then((res) => {
        setProducts(res);
      });
    }
  }, []);

  const updateQuantity = (id: string, count: number) => {
    const updated = products.map((item) =>
      item.documentId === id ? { ...item, count: Math.max(1, count) } : item
    );
    setProducts(updated);
    updateLocalStorage(updated);
  };

  const removeItem = (id: string) => {
    const updated = products.filter((item) => item.documentId !== id);
    setProducts(updated);
    updateLocalStorage(updated);
  };

  const updateLocalStorage = (items: Product[]) => {
    const cartToStore = items.map(({ documentId, count }) => ({
      id: documentId,
      count,
    }));
    localStorage.setItem("cart", JSON.stringify(cartToStore));
  };

  const total = products.reduce((acc, p) => acc + p.price * p.count, 0);

  return (
    <div>
      {/* Desktop Table */}
      <div className="hidden md:block w-full border rounded-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Subtotal</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.documentId} className="border-t">
                <td className="p-4 flex items-center space-x-3">
                  <Image
                    src={`https://wealthy-idea-ec9a86a949.strapiapp.com${product.image.url}`}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <span>{product.name}</span>
                </td>
                <td className="p-4">${product.price}</td>
                <td className="p-4 flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(product.documentId, product.count - 1)
                    }
                    className="px-2 border rounded"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={product.count}
                    onChange={(e) =>
                      updateQuantity(
                        product.documentId,
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-12 text-center border rounded"
                  />
                  <button
                    onClick={() =>
                      updateQuantity(product.documentId, product.count + 1)
                    }
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </td>
                <td className="p-4">
                  ${(product.price * product.count).toFixed(2)}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => removeItem(product.documentId)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product.documentId}
            className="border rounded-md p-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-4">
              <Image
                src={`https://wealthy-idea-ec9a86a949.strapiapp.com${product.image.url}`}
                alt={product.name}
                width={60}
                height={60}
                className="rounded-md"
              />
              <div className="flex flex-col">
                <span className="font-medium">{product.name}</span>
                <span className="text-sm text-gray-600">
                  ${product.price} x {product.count}
                </span>
                <span className="font-semibold">
                  ${(product.price * product.count).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(product.documentId, product.count - 1)
                  }
                  className="px-2 border rounded"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  value={product.count}
                  onChange={(e) =>
                    updateQuantity(
                      product.documentId,
                      parseInt(e.target.value) || 1
                    )
                  }
                  className="w-12 text-center border rounded"
                />
                <button
                  onClick={() =>
                    updateQuantity(product.documentId, product.count + 1)
                  }
                  className="px-2 border rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(product.documentId)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom buttons and total */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-3">
        <Link
          href="/shop"
          className="border px-4 py-2 rounded-md w-full md:w-auto text-center"
        >
          Return To Shop
        </Link>
      </div>

      <div className="border p-4 rounded-md w-full md:w-1/3 mt-6">
        <h2 className="text-lg font-semibold mb-3">Cart Total</h2>
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between mt-2 font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="bg-red-500 text-white w-full mt-4 py-2 rounded-md">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
