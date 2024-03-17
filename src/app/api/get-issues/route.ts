export async function GET(request: Request) {
    const queryParams = new URLSearchParams(request.url.split('?')[1])
    const page = queryParams.get('page') || '1'
    const perPage = queryParams.get('perPage') || '10'

    const owner = 'tsaichiehhuang'
    const repo = 'TestBlog'
    try {
        const res = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/issues?page=${page}&per_page=${perPage}`,
            {
                headers: {
                    Accept: 'application/json',
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
            return new Response(errorMessage)
        }
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error: any) {
        return new Response(error.message, {
            status: 500,
            statusText: 'Internal Server Error',
        })
    }
}
