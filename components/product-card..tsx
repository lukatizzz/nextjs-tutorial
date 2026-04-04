
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

export function ProductCard({ prop }: { prop: ProductResType["data"] }) {
  return (
    <Card key={prop.id} className="flex flex-col justify-between">
      <div className="relative">
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        <Image
          src={prop.image}
          alt={prop.name}
          height={100}
          width={200}
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
        <CardFooter className="mt-1">
          <div className="flex items-center flex-wrap justify-center gap-1 text-sm font-medium">
            <DeleteProductButton product={prop} />
            <Link href={`/product/${prop.id}`}>
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 h-8 text-xs "
              >
                Chỉnh sửa
              </Button>
            </Link>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
