import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const queryParams = new URLSearchParams(request.url.split('?')[1])
    const page = queryParams.get('page') || '1'
    const perPage = queryParams.get('perPage') || '8'
    const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER_NAME
    const repo = process.env.NEXT_PUBLIC_GITHUB_REPO_NAME

    try {
        const res = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/issues?page=${page}&per_page=${perPage}`,
            {
                headers: {
                    Accept: 'application/json',
                    // 'Accept-Encoding': 'gzip, compress, br',
                },
                method: 'GET',
            }
        )

        const data = await res.json()
        if (!res.ok) {
            const errorMessage =
                res.status === 404
                    ? 'Issue not found'
                    : res.status === 403
                    ? 'Forbidden to access issue'
                    : 'Failed to fetch issue'
            return NextResponse.json({ error: errorMessage }, { status: res.status })
        }
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Encoding': 'gzip',
            },
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            {
                status: 500,
            }
        )
    }
}
