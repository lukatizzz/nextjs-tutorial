"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/components/app-provider"
import { useEffect, useState } from "react"

export default function CartButton() {
  const { cart } = useAppContext()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const totalItems = mounted ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0

  return (
    <Button variant="outline" size="icon" asChild className="relative">
      <Link href="/products/cart">
        <ShoppingCart className="size-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </Link>
    </Button>
  )
}
