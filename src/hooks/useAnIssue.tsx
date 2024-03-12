import { useState } from 'react'
interface Issue {
    id: number
    title: string
    body: string
    created_at: string
    labels: any
    comments_url: string
    comments: number
}
function useAnIssue() {
    const [issue, setIssue] = useState<Issue | null>(null)
    const [error, setError] = useState<string | null>(null)

    const owner = 'tsaichiehhuang'
    const repo = 'TestBlog'
    const getAnIssue = async (number: number | null) => {
        try {
            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}`, {
                headers: {
                    Accept: 'application/vnd.github+json',
                },
                method: 'GET',
            })
            if (res.status !== 200 && res.status !== 404) {
                throw new Error('Failed to fetch issue')
            }
            setIssue(await res.json())
        } catch (error: any) {
            setError(error.message)
        }
    }

    return { getAnIssue, issue, error }
}

export default useAnIssue
