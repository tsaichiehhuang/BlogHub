export async function PATCH(request: Request) {
    const owner = 'tsaichiehhuang'
    const repo = 'TestBlog'
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/12`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'PATCH',
    })

    const data = await res.json()

    return data
}
