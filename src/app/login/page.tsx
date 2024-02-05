import LoginButton from '@/components/LoginButton'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
    title: 'BlogHub - Log in',
}

export default function LoginPage() {
    console.log('hi')
    console.log('hi', cookies().get('access_token')?.value)
    return (
        <div className="flex min-h-screen">
            <div className="w-full bg-white ">
                <Link
                    href="https://repohistory.com"
                    className="ml-auto mt-10 flex items-center gap-3 pl-10 text-2xl
            font-bold leading-tight text-white md:hidden"
                >
                    BlogHub
                </Link>
                <h1 className="pt-36 text-center text-4xl font-bold leading-tight text-black">Log in</h1>
                <div className="flex flex-col items-center gap-10">
                    <LoginButton />
                </div>
            </div>
        </div>
    )
}
