import productsApiRequest from "@/apiRequests/products";
import { ProductAddForm } from "@/components/product-add-form";

export default async function ProductDetailPage({params}: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let product = null;
    try {   
        const res = await productsApiRequest.getDetail(Number(id));
        product = res.payload.data;
    } catch (error) {
        console.error("Failed to fetch product details:", error);
        // Handle error, e.g., show an error message or redirect
    }

    return (
      <div>
        {!product && <p>Không tìm thấy sản phẩm</p>}
        {product && (
          <div className="flex flex-col items-center justify-center mt-10 mb-10">
            <h1 className="text-4xl font-bold mb-10 text-center">
              Chi tiết sản phẩm
            </h1>
            <ProductAddForm product={product} />
          </div>
        )}
      </div>
    );
}