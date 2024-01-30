import { NextAuthOptions, User, getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import GithubProvider from 'next-auth/providers/github'

export const authConfig: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
}

export async function loginIsRequiredServer() {
    const session = await getServerSession(authConfig)
    if (!session) return redirect('/')
}

export function loginIsRequiredClient() {
    if (typeof window !== 'undefined') {
        const session = useSession()
        const router = useRouter()
        if (!session) router.push('/')
    }
}
