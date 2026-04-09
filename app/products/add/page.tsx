import { ProductAddForm } from "@/components/product-add-form";


export default function page() {
  return (
    <div className='flex flex-col items-center justify-center mt-10 mb-10'>
      <h1 className='text-4xl font-bold mb-10 text-center'>Thêm sản phẩm mới</h1>
      <ProductAddForm />
    </div>
  )
}
