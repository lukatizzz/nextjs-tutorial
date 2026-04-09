"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useAppContext } from "@/components/app-provider";
import CartItemRow from "./cart-item-row";
import CartSummary from "./cart-summary";

export default function CartList() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useAppContext();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4 text-muted-foreground">
        <ShoppingCart className="size-20 opacity-20" />
        <p className="text-xl font-medium">Giỏ hàng trống</p>
        <Link
          href="/products"
          className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 transition"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 rounded-xl border bg-card px-5">
        {cart.map((item) => (
          <CartItemRow
            key={item.product.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>
      <CartSummary cart={cart} onClear={clearCart} />
    </div>
  );
}
