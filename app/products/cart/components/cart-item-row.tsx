"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/app-provider";

export default function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}) {
  const { product, quantity } = item;

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      <Link href={`/products/${product.id}`} className="flex items-center gap-4 flex-1 min-w-0 hover:opacity-80 transition-opacity">
        <div className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden bg-white/90">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm line-clamp-2">{product.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {product.price.toLocaleString()} đ / sản phẩm
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
        >
          <Minus className="size-3" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
        >
          <Plus className="size-3" />
        </Button>
      </div>

      <div className="w-28 text-right shrink-0">
        <p className="font-semibold text-sm">
          {(product.price * quantity).toLocaleString()} đ
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
        onClick={() => onRemove(product.id)}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
