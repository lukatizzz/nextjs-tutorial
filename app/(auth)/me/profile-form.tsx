"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { AccountResType, UpdateMeBody, UpdateMeBodyType } from "@/schemaValidations/account.schema";
import accountApiRequest from "@/apiRequests/account";

export function ProfileForm({ prop }: { prop: AccountResType["data"] }) {
    const router = useRouter();
    const form = useForm<UpdateMeBodyType>({
        resolver: zodResolver(UpdateMeBody),
        defaultValues: {
            name: prop.name,
        },
    });
    const { isSubmitting } = form.formState;

    async function onSubmit(data: UpdateMeBodyType) {
        try {
            await accountApiRequest.meUpdate(data);
            toast.success("Cập nhật thông tin thành công");
            router.refresh();
        } catch (error: any) {
            handleErrorApi({ error, setError: form.setError });
        }
    }

    return (
        <Card className={`w-[80vw] `}>
            <CardContent>
                <form
                    id="form-rhf-demo"
                    onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))}
                    noValidate
                >
                    <FieldGroup>
                        <Field >
                            <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
                            <Input
                                className="mt-1"
                                value={prop.email}
                                id="form-rhf-demo-email"
                                placeholder="Nguyễn Văn A"
                                autoComplete="off"
                                type="email"
                                disabled
                            />
                        </Field>

                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-name">
                                        Họ và tên
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Nguyễn Văn A"
                                        autoComplete="off"
                                        type="text"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <Button
                        type="submit"
                        form="form-rhf-demo"
                        className="w-full mt-12 h-10"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Đang xử lý..." : "Cập nhật thông tin"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
