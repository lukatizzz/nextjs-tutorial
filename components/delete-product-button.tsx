"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { ProductResType } from "@/schemaValidations/product.schema";
import productsApiRequest from "@/apiRequests/products";
import { toast } from "sonner";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";

export default function DeleteProductButton({ product }: { product: ProductResType["data"] }) {
    const router = useRouter();
    async function handleDelete() { 
        try {
            await productsApiRequest.delete(product.id);
            toast.success("Xóa sản phẩm thành công");
            router.refresh();
        } catch (error: any) {
            handleErrorApi({ error });
        }
    }
     return (
       <AlertDialog>
         <AlertDialogTrigger asChild>
           <Button
             variant="destructive"
             size="sm"
           >
             <Trash2Icon />
           </Button>
         </AlertDialogTrigger>
         <AlertDialogContent size="sm">
           <AlertDialogHeader>
             <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
               <Trash2Icon />
             </AlertDialogMedia>
             <AlertDialogTitle>Bạn có chắc chắn muốn xóa sản phẩm "{product.name}" không?</AlertDialogTitle>
             <AlertDialogDescription>
               Hành động này không thể hoàn tác. Sản phẩm sẽ bị xóa vĩnh viễn khỏi hệ thống.
             </AlertDialogDescription>
           </AlertDialogHeader>
           <AlertDialogFooter>
             <AlertDialogCancel variant="outline">Hủy</AlertDialogCancel>
             <AlertDialogAction variant="destructive">Xóa</AlertDialogAction>
           </AlertDialogFooter>
         </AlertDialogContent>
       </AlertDialog>
     );
}
