'use client'

import { Button } from '@nextui-org/react'
import Cookies from 'js-cookie'
export default function LogoutButton() {
    const handleLogout = () => {
        Cookies.remove('access_token')
        location.reload()
    }

    return (
        <Button
            className="m-4 bg-[#222223] font-semibold text-white p-5"
            radius="full"
            size="md"
            onClick={handleLogout}
        >
            Logout
        </Button>
    )
}
