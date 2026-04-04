'use client'

import { useLayoutEffect } from "react"
import { clientSessionToken } from "../lib/http"

export default function AppProvider({ children, initialSessionToken = '' }: { children: React.ReactNode, initialSessionToken?: string }) {
    useLayoutEffect(() => {
        clientSessionToken.value = initialSessionToken;
    }, [initialSessionToken]);
    return (<>{children}</>)
}