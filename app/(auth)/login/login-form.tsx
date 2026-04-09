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
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import { toast } from "sonner"
import apiAuthRequest from "@/apiRequests/auth"
import { useRouter } from "next/navigation"
import { handleErrorApi } from "@/lib/utils"



export function LoginForm() {
  const router = useRouter()
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(data: LoginBodyType) {
    try {
      const res = await apiAuthRequest.login(data);
      await apiAuthRequest.auth({
        sessionToken: res.payload.data.token,
        expiresAt: res.payload.data.expiresAt,
      });
      toast.success(res.payload.message);
      router.replace('/')
      router.refresh()

    } catch (error: any) {
      handleErrorApi({ error, setError: form.setError })
    }
  }

  return (
    <Card className="w-[80vw]">

      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))} noValidate>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-name">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@gmail.com"
                    autoComplete="off"
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-name">
                    Mật khẩu
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="123123"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit" form="form-rhf-demo" className="w-full mt-12 h-10" disabled={isSubmitting}>
            {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
