import { ShoppingCart } from "lucide-react";
import CartList from "./components/cart-list";

export default function CartPage() {
  return (
    <div className="mt-10 mb-10 px-2.5 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-3">
        <ShoppingCart className="size-10" />
        Giỏ hàng
      </h1>
      <div className="w-full h-px bg-black dark:bg-white" />
      <CartList />
    </div>
  );
}
