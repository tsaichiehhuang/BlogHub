'use client'

import React, { useState, useEffect } from 'react'
import ArticleDisplayLayout from './ArticleDisplayLayout'
import { Card, Skeleton, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import Error from '@/components/Error'
import { Issue } from '@/types'

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
    const Loading = () => (
        <Card shadow="sm" className="h-72 space-y-5  p-4 md:pl-8 ">
            <CardHeader className="">
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-12 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </CardHeader>

            <CardBody className="">
                <Skeleton className="w-full rounded-lg">
                    <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </CardBody>

            <CardFooter className="justify-between">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-8 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </CardFooter>
        </Card>
    )
    return (
        <>
            {Object.keys(issues).length === 0 ? (
                error ? (
                    <Error statusCode={statusCode} />
                ) : (
                    <>
                        <Loading />
                        <Loading />
                        <Loading />
                    </>
                )
            ) : (
                issues.map((issue: any, index: number) => <ArticleDisplayLayout issue={issue} key={index} />)
            )}

            {!hasMoreIssues && (
                <div className="text-gray-400 flex justify-center items-center font-bold text-lg p-9">
                    - 無更多文章 -{' '}
                </div>
            )}
        </>
    )
}
