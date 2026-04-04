

import { cookies } from "next/headers"
import accountApiRequest from "@/apiRequests/account"
import { ProfileForm } from "./profile-form"

export default async function MePage() {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('sessionToken')?.value 

    const res = await accountApiRequest.me(sessionToken ?? '' )
    
    return (
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold mb-10 mt-10 text-center">Thông tin cá nhân</h1>
        <ProfileForm prop={res.payload.data} />
      </div>
    );
}