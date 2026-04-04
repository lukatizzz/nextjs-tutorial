"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { handleErrorApi } from "@/lib/utils"
import { CreateProductBody, CreateProductBodyType, ProductResType, UpdateProductBodyType} from "@/schemaValidations/product.schema"
import { Textarea } from "@/components/ui/textarea"
import { useRef, useState } from "react"

import Image from 'next/image'
import mediaApiRequest from "@/apiRequests/media"
import productsApiRequest from "@/apiRequests/products"

export function ProductAddForm({product}: {product?: ProductResType["data"]}) {
    const router = useRouter()
    const form = useForm<CreateProductBodyType>({
        resolver: zodResolver(CreateProductBody),
        defaultValues: {
            name: product?.name || "",
            price: product?.price || 0,
            description: product?.description || "",
            image: product?.image || "",
        },
    })
    const { isSubmitting } = form.formState
    const fileRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null)
    const image = form.watch("image")

    async function create(data: CreateProductBodyType) {
        const resUpload = await mediaApiRequest.upload(file as File);
        const res = await productsApiRequest.create({
          ...data,
          image: resUpload.payload.data,
        });
        toast.success(res.payload.message);
        router.push("/product");
        router.refresh();
    }

    async function update(data: UpdateProductBodyType) {
        if (file){
            const resUpload = await mediaApiRequest.upload(file as File);
            data.image = resUpload.payload.data
        }
        const res = await productsApiRequest.update(product!.id, data);
        toast.success(res.payload.message);
        router.refresh();
    }

    async function onSubmit(data: CreateProductBodyType | UpdateProductBodyType) {
        try {
            if (product) {
                await update(data as UpdateProductBodyType)
            } else {
                await create(data as CreateProductBodyType)
            }
        } catch (error: any) {
            handleErrorApi({ error, setError: form.setError })
        }
    }

    return (
        <Card className="w-[80vw]">

            <CardContent>
                <form id="form-rhf-product-add" onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))} noValidate>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-product-add-name">
                                        Tên sản phẩm
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-product-add-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Tên sản phẩm"
                                        autoComplete="off"
                                        type="text"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="price"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-product-add-price">
                                        Giá
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-product-add-price"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="123123"
                                        autoComplete="off"
                                        type="text"
                                        inputMode="numeric"
                                        value={field.value}
                                        onChange={(e) => {
                                            const digits = e.target.value.replace(/[^0-9]/g, '')
                                            field.onChange(digits === "" ? 0 : Number(digits))
                                        }}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-product-add-description">
                                        Mô tả
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="form-rhf-product-add-description"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Mô tả sản phẩm"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="image"
                            control={form.control}
                            render={({ field: { value, onChange, ...restField }, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-product-add-image">
                                        Ảnh
                                    </FieldLabel>
                                    <Input
                                        {...restField}
                                        ref={fileRef}
                                        id="form-rhf-demo-image"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Ảnh sản phẩm"
                                        autoComplete="off"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) {
                                                setFile(file)
                                                onChange(URL.createObjectURL(file))
                                            }
                                        }}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                    {(file || image) && (
                                        <div className="rounded-lg overflow-hidden">
                                            <Image
                                                src={file ? URL.createObjectURL(file) : image}
                                                alt="Ảnh từ server"
                                                width={250}
                                                height={250}
                                                className="rounded-lg"
                                            />
                                            <Button
                                                variant="destructive"
                                                size="lg"
                                                className="mt-1"
                                                type="button"
                                                onClick={() => {
                                                    setFile(null)
                                                    onChange('')
                                                    if (fileRef.current) fileRef.current.value = ''
                                                }}
                                            >
                                                Xóa
                                            </Button>
                                        </div>
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <Button type="submit" form="form-rhf-product-add" className="w-full mt-12 h-10" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang xử lý...' :  (product ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm')}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
