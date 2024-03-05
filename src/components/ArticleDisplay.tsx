'use client'

import React, { useState, useEffect } from 'react'
import ArticleDisplayLayout from './ArticleDisplayLayout'
import useGetIssues from '@/hooks/useGetIssues'

export default function ArticleDisplay() {
    const [page, setPage] = useState(1)
    const { getIssues, issues, hasMoreIssues } = useGetIssues()

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        getIssues(page)
        if (hasMoreIssues) {
            window.addEventListener('scroll', handleScroll)
            return () => {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [page])

    return (
        <>
            {issues.map((issue: any, index: number) => (
                <ArticleDisplayLayout issue={issue} key={index} />
            ))}
            {!hasMoreIssues && (
                <div className="text-gray-400 flex justify-center items-center font-bold text-lg p-9">無更多文章</div>
            )}
        </>
    )
}
