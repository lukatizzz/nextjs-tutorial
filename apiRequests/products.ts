import http from "@/lib/http";
import { MessageResType } from "@/schemaValidations/common.schema";
import { CreateProductBodyType, ProductListResType, ProductResType, UpdateProductBodyType } from "@/schemaValidations/product.schema";

const productsApiRequest = {
    create: (body: CreateProductBodyType) => {
        return http.post<ProductResType>("/products", body);
    },
    update: (id: number, body: UpdateProductBodyType) => {
        return http.put<ProductResType>(`/products/${id}`, body);
    },
    getList: () => {
        return http.get<ProductListResType>("/products", 
            {
                cache: "no-store",
            }
        );
    },
    getDetail: (id: number) => {
        return http.get<ProductResType>(`/products/${id}`, {
            cache: "no-store",
        });
    },
    delete: (id: number) => {
        return http.delete<MessageResType>(`/products/${id}`);
    },
    getMyProducts: (sessionToken: string) => {
        return http.get<ProductListResType>("/products/me", {
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${sessionToken}`,
            },
        });
    }

};

export default productsApiRequest;