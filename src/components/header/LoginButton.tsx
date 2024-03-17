'use client'

import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export default function LoginButton() {
    const router = useRouter()
    let code: string | null = null
    if (typeof window !== 'undefined') {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        code = urlParams.get('code')
    }

    useEffect(() => {
        const url = window.location.href
        const hasCode = url.includes('?code=') // 判斷是否有 code 參數

        if (hasCode) {
            ;(async () => {
                await fetch('/api/get-access-token', {
                    headers: {
                        Accept: 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({ code }),
                })
                router.push('/')
            })()
        }
    }, [code, router])

    const isLoading = code !== undefined && code !== null

    return (
        <Button
            isLoading={isLoading}
            className="m-4 bg-[#222223] font-semibold text-white p-5"
            radius="full"
            size="md"
            as={Link}
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SITE_URL}/login&scope=project%20repo%20issues:write`}
        >
            Continue with GitHub
        </Button>
    )
}