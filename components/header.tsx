import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import ButtonLogout from './button-logout'
import { cookies } from 'next/headers'
import accountApiRequest from '@/apiRequests/account'
import NavMenu from './nav-menu'

export default async function Header() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('sessionToken')?.value
  let user = null

  if (sessionToken) {
      const res =
        await accountApiRequest.me(
          sessionToken ?? ''
        );
        user = res.payload.data

        console.log('User info:', user)

     
    
  } else {
    console.log(sessionToken);
  }

    return (
      <div className="flex items-center flex-col md:flex-row p-4 justify-between">
        <h1 className="text-2xl font-bold">
          {user ? `Xin chào, ${user.name}` : "Xin chào"}
        </h1>
        {/* <ul>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
              <li>
                <Link href="/product">Product</Link>
              </li>
              <li>
                <Link href="/product/add">Add Product</Link>
              </li>
            </ul> */}
        {user ? (
          <div className="flex flex-col md:flex-row items-center gap-5">
            <NavMenu
              links={[
                { href: "/me", label: "Thông tin cá nhân" },
                { href: "/product", label: "Sản phẩm" },
                { href: "/product/add", label: "Thêm sản phẩm" },
              ]}
            />
            <ModeToggle />
            <ButtonLogout />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-5">
            <NavMenu
              links={[
                { href: "/login", label: "Đăng nhập" },
                { href: "/register", label: "Đăng ký" },
                { href: "/product", label: "Sản phẩm" },
              ]}
            />
            <ModeToggle />
           </div> 
        
        )}
      </div>
    );
}