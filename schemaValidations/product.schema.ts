import z from 'zod'

export const CreateProductBody = z.object({
  name: z.string().min(1, 'Tên sản phẩm không được để trống').max(256, 'Tên sản phẩm không được vượt quá 256 ký tự'),
  price: z.number().positive('Giá sản phẩm phải lớn hơn 0'),
  description: z.string().max(10000, 'Mô tả sản phẩm không được vượt quá 10000 ký tự'),
  image: z.string().url('Chưa chọn ảnh')
})

export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const ProductRes = z.object({
  data: ProductSchema,
  message: z.string()
})

export type ProductResType = z.TypeOf<typeof ProductRes>

export const ProductListRes = z.object({
  data: z.array(ProductSchema),
  message: z.string()
})

export type ProductListResType = z.TypeOf<typeof ProductListRes>

export const UpdateProductBody = CreateProductBody
export type UpdateProductBodyType = CreateProductBodyType
export const ProductParams = z.object({
  id: z.coerce.number()
})
export type ProductParamsType = z.TypeOf<typeof ProductParams>
