import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { code } = await request.json()
    const res = await fetch(
        `https://github.com/login/oauth/access_token?${new URLSearchParams({
            code,
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            scope: 'repo,issues:write',
        })}`,
        {
            headers: {
                Accept: 'application/json',
            },
            method: 'POST',
        }
    )

    const data = await res.json()
    const accessToken = data.access_token
    const userRes = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `token ${accessToken}`,
        },
    })
    const userData = await userRes.json()
    const username = userData.login
    const userAvatar = userData.avatar_url
    cookies().set('access_token', accessToken, {
        path: '/',
        maxAge: 8 * 60 * 60,
    })
    cookies().set('username', username, {
        path: '/',
        maxAge: 8 * 60 * 60,
    })
    cookies().set('userAvatar', userAvatar, {
        path: '/',
        maxAge: 8 * 60 * 60,
    })

    return new NextResponse(data)
}
