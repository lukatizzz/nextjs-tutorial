"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductResType } from "@/schemaValidations/product.schema";
import Link from "next/link";
import DeleteProductButton from "./delete-product-button";
import { useAppContext } from "./app-provider";
import { use } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

export function ProductCard({
  prop,
  canEdit = false,
  detailHref = `/products/${prop.id}`,
}: {
  prop: ProductResType["data"];
  canEdit?: boolean;
  detailHref?: string | null;
}) {
  const { user, addToCart } = useAppContext();
  const router = useRouter();
  return (
    <Card key={prop.id} className="flex flex-col justify-between">
      <Link href={detailHref ?? "#"} onClick={detailHref ? undefined : (e) => e.preventDefault()}>
        <div
          className="relative"
          onDragStart={(e) => {
            e.preventDefault();
          }}
        >
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          <Image
            src={prop.image}
            alt={prop.name}
            height={100}
            width={200}
            draggable={false}
            className="w-full mx-auto object-contain bg-white/90"
          />
        </div>
        <div>
          <CardHeader className="h-[100px] flex flex-col justify-start overflow-hidden">
            <CardTitle className="text-sm font-bold line-clamp-2">
              {prop.name}
            </CardTitle>
            <CardDescription className="text-xs line-clamp-3">
              Giá: {prop.price.toLocaleString()} đ
            </CardDescription>
            <CardDescription className="text-xs line-clamp-3">
              Mô tả: {prop.description}
            </CardDescription>
          </CardHeader>
        </div>
      </Link>

        <CardFooter className="mt-1">
          <div className="flex items-center flex-wrap justify-center gap-2 text-sm font-medium">
            {!canEdit && (
              <Button size="sm" className="flex-1 h-8 text-xs" onClick={() => addToCart(prop)}>
                <ShoppingCart />
              </Button>
            )}
            {user?.id === prop.createdByUserId && canEdit && (
              <DeleteProductButton product={prop} />
            )}

            {user?.id === prop.createdByUserId && canEdit && (
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 h-8 text-xs "
                onClick={() => router.push(`/products/${prop.id}/edit`)}
              >
                Chỉnh sửa
              </Button>
            )}
          </div>
        </CardFooter>
    </Card>
  );
}
