// import Image from 'next/image'

// import githubLogo from '@/public/github.png'
// import { GithubSignInButton } from '@/components/authButtons'
// import { getServerSession } from 'next-auth'
// import { authConfig } from '@/lib/auth'
// import { redirect } from 'next/navigation'
// import { getCsrfToken } from 'next-auth/react'

// export default async function SignInPage() {
//     const session = await getServerSession(authConfig)

//     console.log('Session: ', session)

//     if (session) return redirect('/posts')

//     return (
//         <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
//             <div className="flex flex-col items-center mt-10 p-10 shadow-md">
//                 <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>

//                 <GithubSignInButton />
//             </div>
//         </div>
//     )
// }

import LoginButton from '@/components/LoginButton'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'BlogHub - Log in',
}

export default function LoginPage() {
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
