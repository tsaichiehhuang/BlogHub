'use client'
import { useEffect, useState } from 'react'
import { Article } from '@/components/article/Article'
import Error from '@/components/Error'
import { Issue } from '@/types'
import { ArticleLoading } from '@/components/article/ArticleLoading'

interface ArticleProps {
    isLogin: boolean
}

export default function ArticleSquare(props: ArticleProps) {
    const [comments, setComments] = useState([])
    const [issue, setIssue] = useState<Issue | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [statusCode, setStatusCode] = useState<number | null>(null)

    const { isLogin } = props
    let number: number | null = null
    if (typeof window !== 'undefined') {
        const path = window.location.pathname
        const parts = path.split('/')
        if (!Number.isNaN(parseInt(parts[parts.length - 1]))) {
            number = parseInt(parts[parts.length - 1])
        }
    }

    useEffect(() => {
        const fetchAnIssue = async (number: number | null) => {
            try {
                const response = await fetch(`/api/get-an-issue/${number}`)
                const data = await response.json()
                setIssue(data.issue)
                setComments(data.comments)
                if (!response.ok) {
                    setStatusCode(response.status)
                    return
                }
            } catch (error: any) {
                setError(error.message)
            }
        }

        fetchAnIssue(number)
    }, [number, issue?.comments_url])

    return (
        <>
            {issue === null && number === null ? (
                error ? (
                    <Error statusCode={statusCode} />
                ) : (
                    <ArticleLoading />
                )
            ) : (
                <Article issue={issue} comments={comments} isLogin={isLogin} number={number} />
            )}
        </>
    )
}
