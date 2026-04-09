"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/app-provider";

export default function CartSummary({
  cart,
  onClear,
}: {
  cart: CartItem[];
  onClear: () => void;
}) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="mt-6 rounded-xl border bg-card p-5 flex flex-col gap-4">
      <h2 className="font-semibold text-base">Tóm tắt đơn hàng</h2>
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex justify-between">
          <span>Số lượng sản phẩm</span>
          <span className="text-foreground font-medium">{totalItems}</span>
        </div>
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span className="text-foreground font-medium">
            {totalPrice.toLocaleString()} đ
          </span>
        </div>
      </div>
      <div className="h-px bg-border" />
      <div className="flex justify-between font-bold text-base">
        <span>Tổng cộng</span>
        <span>{totalPrice.toLocaleString()} đ</span>
      </div>
      <Button className="w-full gap-2">
        <ShoppingCart className="size-4" />
        Đặt hàng
      </Button>
      <Button
        variant="outline"
        className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
        onClick={onClear}
      >
        <Trash2 className="size-4" />
        Xóa giỏ hàng
      </Button>
    </div>
  );
}
