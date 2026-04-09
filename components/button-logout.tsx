'use client'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import apiAuthRequest from '@/apiRequests/auth'
import { handleErrorApi } from '@/lib/utils'
import { toast } from 'sonner'

export default function ButtonLogout() {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            const res = await apiAuthRequest.logoutFromNextClientToServer(false)
            router.replace('/login')
            toast.success(res.payload.message)
            router.refresh()
        } catch (error: any) {
            handleErrorApi({ error })
        }
    }
    return (
        <Button size={'sm'} onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive">Đăng xuất</Button>
    )
}
