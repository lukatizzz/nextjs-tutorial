import Link from "next/link";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold mb-10 mt-10 text-center">Đăng nhập tài khoản</h1>
      <LoginForm />
      <div className="mt-20 mb-10 text-center">
        <p>Bạn chưa có tài khoản? <Link href="/register" className="text-blue-600 underline">Đăng ký</Link></p>
      </div>
    </div>
  )
}
