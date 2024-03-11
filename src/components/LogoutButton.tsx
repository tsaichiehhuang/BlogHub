'use client'

import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'
import Cookies from 'js-cookie'
export default function LogoutButton() {
    const router = useRouter()
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const code = urlParams.get('code')

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
