'use client'

import { Button } from '@nextui-org/react'
import Cookies from 'js-cookie'
export default function LogoutButton() {
    const handleLogout = () => {
        Cookies.remove('access_token')
        location.reload()
    }

    return (
        <Button className="p-5 m-4 font-semibold text-white bg-blue-600" radius="full" size="md" onClick={handleLogout}>
            Logout
        </Button>
    )
}
