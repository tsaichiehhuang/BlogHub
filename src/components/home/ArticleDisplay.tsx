'use client'

import React, { useState, useEffect } from 'react'
import ArticleDisplayLayout from '@/components/home/ArticleDisplayLayout'
import Error from '@/components/Error'
import { Issue } from '@/types'
import { ArticleDisplayLoading } from '@/components/home/ArticleDisplayLoading'

export default function ArticleDisplay() {
    const [page, setPage] = useState(1)
    const [issues, setIssues] = useState<Issue[]>([])
    const [hasMoreIssues, setHasMoreIssues] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [statusCode, setStatusCode] = useState<number>()

    const perPage = 10
    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        const fetchIssues = async () => {
            const response = await fetch(`/api/get-issues?page=${page}`)
            const data = await response.json()
            if (!response.ok) {
                setStatusCode(response.status)
                setError(response.statusText)
            }

            if (response.status === 200) {
                setIssues((prevIssues) => [...prevIssues, ...data])
            }
            if (data.length < perPage) {
                setHasMoreIssues(false)
            }
        }
        fetchIssues()
        if (hasMoreIssues && !error) {
            if (typeof window !== 'undefined') {
                window.addEventListener('scroll', handleScroll)
                return () => {
                    window.removeEventListener('scroll', handleScroll)
                }
            }
        }
    }, [page])

    return (
        <>
            {Object.keys(issues).length === 0 ? (
                error ? (
                    <Error statusCode={statusCode} />
                ) : (
                    <>
                        <ArticleDisplayLoading />
                        <ArticleDisplayLoading />
                        <ArticleDisplayLoading />
                    </>
                )
            ) : (
                issues.map((issue: any, index: number) => <ArticleDisplayLayout issue={issue} key={index} />)
            )}

            {!hasMoreIssues && (
                <div className="text-gray-400 flex justify-center items-center font-bold text-lg p-9">
                    - 無更多文章 -
                </div>
            )}
        </>
    )
}
