'use client'

import React, { useState, useEffect } from 'react'
import { Issue } from '@/types'
import { Card } from '@nextui-org/react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import dynamic from 'next/dynamic'
const Error = dynamic(() => import('@/components/Error'))
const ArticleDisplayLoading = dynamic(() => import('@/app/(home)/components/ArticleDisplayLoading'))
const ArticleDisplayLayout = dynamic(() => import('@/app/(home)/components/ArticleDisplayLayout'))

export default function ArticleDisplay() {
    useEffect(() => {
        AOS.init()
    }, [])
    const [page, setPage] = useState(1)
    const [issues, setIssues] = useState<Issue[]>([])
    const [hasMoreIssues, setHasMoreIssues] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [statusCode, setStatusCode] = useState<number>()
    const perPage = 8
    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        const fetchIssues = async () => {
            const response = await fetch(`/api/get-issues?page=${page}`, { cache: 'no-cache' })
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
        <div data-aos="fade-up" className="grid flex-col grid-cols-12 pt-6 pb-8 bg-gradient-to-r from-white to-sky-100">
            <div className="col-span-12 py-8 text-3xl font-bold text-center">My Articles</div>
            <div className="grid grid-cols-1 col-span-10 col-start-2 gap-4 md:grid-cols-3">
                {Object.keys(issues).length === 0 ? (
                    error ? (
                        <div className="col-span-12">
                            <Error statusCode={statusCode} />
                        </div>
                    ) : (
                        <>
                            <ArticleDisplayLoading />
                            <ArticleDisplayLoading />
                            <ArticleDisplayLoading />
                        </>
                    )
                ) : (
                    <>
                        {issues.map((issue: any, index: number) => (
                            <ArticleDisplayLayout issue={issue} key={index} />
                        ))}
                        {hasMoreIssues && (
                            <Card isBlurred className="items-center justify-center text-lg font-bold text-gray-400 p-9">
                                下滑查看更多文章
                            </Card>
                        )}
                    </>
                )}

                {!hasMoreIssues && (
                    <div className="flex items-center justify-center text-lg font-bold text-gray-400 p-9">
                        - 無更多文章 -
                    </div>
                )}
            </div>
        </div>
    )
}
