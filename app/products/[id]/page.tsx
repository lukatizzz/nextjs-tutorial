import productsApiRequest from "@/apiRequests/products";
import { ProductCard } from "@/components/product-card.";
import { handleErrorApi } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";


export default async function ProductEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let product = null;
    try {
      const res = await productsApiRequest.getDetail(Number(id));
      product = res.payload.data;
    } catch (error) {
      handleErrorApi({ error });
      // Handle error, e.g., show an error message or redirect
    }
  return (
    <div>
      {!product && <p>Không tìm thấy sản phẩm</p>}
      {product && (
        <div className="mt-10 mb-10 px-2.5 flex flex-col items-center justify-center ">
          <h1 className="text-4xl font-bold mb-10  flex items-center gap-3 ">
            <ShoppingBag className="size-10" />
            Chi tiết sản phẩm
          </h1>
          <div className="w-full h-px bg-black dark:bg-white"></div>
          <div className="w-full max-w-4xl mt-10">
            <ProductCard prop={product} />
          </div>
        </div>
      )}
    </div>
  );
}