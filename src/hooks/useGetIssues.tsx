import { useState } from 'react'
interface Issue {
    id: number
    title: string
    body: string
    created_at: string
}
function useGetIssues() {
    const [issues, setIssues] = useState<Issue[]>([])
    const [error, setError] = useState<string | null>(null)

    const perPage = 10
    const [hasMoreIssues, setHasMoreIssues] = useState(true)
    const owner = 'tsaichiehhuang'
    const repo = 'TestBlog'
    const getIssues = async (page: number) => {
        try {
            const response = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/issues?page=${page}&per_page=${perPage}`,
                {
                    headers: {
                        Accept: 'application/json',
                    },
                    method: 'GET',
                }
            )
            if (!response.ok) {
                throw new Error('Failed to fetch issues')
            }

            const newIssues = await response.json()

            setIssues((prevIssues) => [...prevIssues, ...newIssues])
            if (newIssues.length < perPage) {
                setHasMoreIssues(false)
            }
        } catch (error: any) {
            setError(error.message)
        }
    }

    return { getIssues, issues, hasMoreIssues, error }
}

export default useGetIssues
