'use client'
import { useEffect, useState } from 'react'
import { Card, Skeleton, CardHeader, CardBody, CardFooter, Image, Chip, Divider } from '@nextui-org/react'
import { remark } from 'remark'
import html from 'remark-html'
import EditArticle from '@/components/EditArticle'
import DeleteArticle from '@/components/DeleteArticle'
import Cookies from 'js-cookie'
import Error from '@/components/Error'
import useAnIssue from '@/hooks/useAnIssue'

interface ArticleProps {
    isLogin: boolean
}

export default function Article(props: ArticleProps) {
    const { getAnIssue, issue, error } = useAnIssue()

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
        getAnIssue(number)
    }, [number])

    const createdAtDate = issue ? new Date(issue.created_at) : null

    const formattedCreatedAt = createdAtDate ? createdAtDate.toLocaleString() : ''
    const formatMarkdown = (markdownContent: string) => {
        const result = remark().use(html).processSync(markdownContent)
        return result.toString()
    }

    return (
        <>
            {issue === null ? (
                error ? (
                    <Error />
                ) : (
                    <Card shadow="sm" className="md:w-[960px] gap-4  md:p-6 p-4 text-left mt-4">
                        <Skeleton className="rounded-lg">
                            <div className="h-24 rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <div className="space-y-3">
                            <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-4/5 rounded-lg">
                                <div className="h-10 w-4/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-2/5 rounded-lg">
                                <div className="h-10 w-2/5 rounded-lg bg-default-300"></div>
                            </Skeleton>
                            <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-4/5 rounded-lg">
                                <div className="h-10 w-4/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-2/5 rounded-lg">
                                <div className="h-10 w-2/5 rounded-lg bg-default-300"></div>
                            </Skeleton>
                        </div>
                    </Card>
                )
            ) : (
                <Card shadow="sm" className="md:max-w-[960px] gap-4  md:p-6 p-4 text-left mt-4">
                    <CardHeader className="justify-between flex">
                        <div className=" text-zinc-700 text-tiny font-medium md:gap-2 gap-1 flex md:justify-center justify-start md:items-center md:flex-row flex-col">
                            發布時間：{formattedCreatedAt}
                            {issue?.labels && issue.labels[0] && (
                                <div className="text-gray-500 text-tiny p-1 flex-item text-start">
                                    | {issue && issue.labels && issue.labels[0]?.name}
                                </div>
                            )}
                        </div>

                        {isLogin && (
                            <div className="md:gap-2 gap-4 flex justify-center items-center">
                                <EditArticle issue={issue} number={number as number} />
                                <DeleteArticle issue={issue} number={number as number} />
                            </div>
                        )}
                    </CardHeader>
                    <div className="  text-black text-[24px] font-bold">{issue && issue.title}</div>
                    <CardBody className="">
                        <div className="text-zinc-700 md:text-md md:font-medium md:justify-self-start">
                            <div
                                className="md:leading-loose"
                                dangerouslySetInnerHTML={{ __html: issue && formatMarkdown(issue.body) }}
                            ></div>
                        </div>
                    </CardBody>
                </Card>
            )}
        </>
    )
}
