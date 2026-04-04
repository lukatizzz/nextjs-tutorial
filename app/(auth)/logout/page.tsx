'use client'

import apiAuthRequest from '@/apiRequests/auth'
import { clientSessionToken } from '@/lib/http'
import { handleErrorApi } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function LogoutPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sessionToken = searchParams.get('sessionToken')
    const handleLogout = async () => {
        try {
            await apiAuthRequest.logoutFromNextClientToServer(true)
            router.replace('/login')
        } catch (error: any) {
            handleErrorApi({ error })
        }
    }

    useEffect(() => {
        if (sessionToken === clientSessionToken.value) {
            handleLogout()
        }
    }, [])
    return (
        <div>page</div>
    )
}
