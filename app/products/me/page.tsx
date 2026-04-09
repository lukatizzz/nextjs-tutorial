import productsApiRequest from "@/apiRequests/products";
import { ProductCard } from "@/components/product-card.";
import { handleErrorApi } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function MyProduct() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  let products = null;
  try {
    const res = await productsApiRequest.getMyProducts(sessionToken ?? "");
    products = res.payload.data;
  } catch (error) {
    handleErrorApi({ error });
  }
  return (
    <div className="mt-10 mb-10 px-2.5 flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold mb-10  flex items-center gap-3 ">
        <ShoppingBag className="size-10" />
        Quản lý sản phẩm
      </h1>
      <div className="w-full h-px bg-black dark:bg-white"></div>
      
      {!products?.length ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-4 text-muted-foreground">
          <ShoppingBag className="size-20 opacity-20" />
          <p className="text-xl font-medium">Chưa có sản phẩm nào</p>
          <Link
            href="/products/add"
            className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 transition"
          >
            Thêm sản phẩm
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 justify-center mt-10">
          {products && products.map((product) => (
            <ProductCard key={product.id} prop={product} canEdit={true} />
          ))}
        </div>
      )}
    </div>
  );
}
