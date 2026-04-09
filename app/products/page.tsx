import productsApiRequest from "@/apiRequests/products"
import { ProductCard } from "@/components/product-card.";
import { ShoppingBag, Underline } from "lucide-react";

export default async function ProductListPage() {
    const res = await productsApiRequest.getList()

    return (
      <div className="mt-10 mb-10 px-2.5 flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold mb-10  flex items-center gap-3 ">
          <ShoppingBag className="size-10" />
          Danh sách sản phẩm
        </h1>
        <div className="w-full h-px bg-black dark:bg-white"></div>
        <div className="flex flex-wrap gap-5 justify-center mt-10">
          {res.payload.data.map((product) => (
            <ProductCard key={product.id} prop={product} />
          ))}
        </div>
      </div>
    );
}
