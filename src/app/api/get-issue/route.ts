import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
    const owner = 'tsaichiehhuang'
    const repo = 'tsaichiehhuang'
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'GET',
    })

    const data = await res.json()

    return 'hi'
}
