"use client"
import { ModeToggle } from './mode-toggle'
import ButtonLogout from './button-logout'
import NavMenu from './nav-menu'
import { useAppContext } from './app-provider'
import CartButton from './cart-button'

export default function Header() {
  const { user } = useAppContext()

  return (
    <div className="flex flex-row flex-wrap items-center justify-between gap-4 border-b border-border bg-white p-4 dark:bg-background">
      <h1 className="min-w-0 flex-1 truncate text-2xl font-bold">
        {user ? `Xin chào, ${user.name}` : "Xin chào"}
      </h1>
      <div className="flex flex-row flex-wrap items-center gap-4 min-w-0">
        <ModeToggle />
        <CartButton />

        {user ? (
          <NavMenu
            links={[
              { href: "/", label: "Trang chủ" },
              { href: "/me", label: "Thông tin cá nhân" },
              { href: "/products", label: "Sản phẩm" },
              { href: "/products/add", label: "Thêm sản phẩm" },
              { href: "/products/me", label: "Quản lý sản phẩm" },
            ]}
            listWidget={[<ButtonLogout key="logout" />]}
          />
        ) : (
          <NavMenu
            links={[
              { href: "/", label: "Trang chủ" },
              { href: "/products", label: "Sản phẩm" },
              { href: "/login", label: "Đăng nhập" },
              { href: "/register", label: "Đăng ký" },
            ]}
          />
        )}
      </div>
    </div>
  );
}