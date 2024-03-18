'use client'
import { useEffect, useState } from 'react'
import { Article } from '@/components/article/Article'
import Error from '@/components/Error'
import { Issue } from '@/types'
import { ArticleLoading } from '@/components/article/ArticleLoading'

interface ArticleProps {
    isAuthorLogin: boolean
    isUserLogin: boolean
    userAvatar: string
}

export default function ArticleSquare(props: ArticleProps) {
    const [comments, setComments] = useState([])
    const [issue, setIssue] = useState<Issue | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [statusCode, setStatusCode] = useState<number | null>(null)
    const [number, setNumber] = useState<number | null>(null)
    const { isAuthorLogin, isUserLogin, userAvatar } = props
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const path = window.location.pathname
            const parts = path.split('/')
            if (!Number.isNaN(parseInt(parts[parts.length - 1]))) {
                setNumber(parseInt(parts[parts.length - 1]))
            }
        }
    }, [])
    useEffect(() => {
        if (number !== null) {
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
        }
    }, [number])

    return (
        <>
            {issue === null && number === null ? (
                error ? (
                    <Error statusCode={statusCode} />
                ) : (
                    <ArticleLoading />
                )
            ) : (
                <Article
                    userAvatar={userAvatar}
                    issue={issue}
                    comments={comments}
                    isAuthorLogin={isAuthorLogin}
                    isUserLogin={isUserLogin}
                    number={number}
                />
            )}
        </>
    )
}
