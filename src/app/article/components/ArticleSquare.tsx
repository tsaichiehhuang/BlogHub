'use client'
import { useEffect, useState } from 'react'
import Error from '@/components/Error'
import { Issue } from '@/types'
import ArticleLoading from '@/app/article/components/ArticleLoading'
import dynamic from 'next/dynamic'
const Article = dynamic(() => import('@/app/article/components/Article'))
interface ArticleProps {
    isAuthorLogin: boolean
    isUserLogin: boolean
    userAvatar: string | undefined
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
                const response = await fetch(`/api/get-an-issue/${number}`, { cache: 'no-cache' })
                const data = await response.json()
                setIssue(data.issue)
                setComments(data.comments)
                if (!response.ok) {
                    setStatusCode(response.status)
                    setError(response.statusText)
                }
            }

            fetchAnIssue(number)
        }
    }, [number])
    return (
        <>
            {issue === null && <ArticleLoading />}
            {issue === undefined && <Error statusCode={statusCode} />}
            {issue !== undefined && issue !== null && (
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
