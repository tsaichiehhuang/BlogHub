interface params {
    id: number
}
export async function GET(request: Request, { params }: { params: params }) {
    const number = params.id
    const owner = 'tsaichiehhuang'
    const repo = 'TestBlog'
    try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}`, {
            headers: {
                Accept: 'application/json',
            },
            method: 'GET',
        })

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
        const commentsUrl = data.comments_url
        const commentsResponse = await fetch(commentsUrl)
        const comments = await commentsResponse.json()

        return new Response(JSON.stringify({ issue: data, comments: comments }), {
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
