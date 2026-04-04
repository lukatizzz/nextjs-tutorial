import Link from "next/link";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold mb-10 mt-10 text-center">Đăng ký tài khoản</h1>
        <RegisterForm />
        <div className="mt-20 mb-10 text-center">
            <p>Bạn đã có tài khoản? <Link href="/login" className="text-blue-500">Đăng nhập</Link></p>
        </div>
    </div>
  )
}
