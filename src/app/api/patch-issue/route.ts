import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request) {
    const { title, body, issue_number } = await request.json()
    const owner = 'tsaichiehhuang'
    const repo = 'TestBlog'
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/12`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'PATCH',
        // body: JSON.stringify({ title: title, body: body }),
    })

    const data = await res.json()

    return data
}
