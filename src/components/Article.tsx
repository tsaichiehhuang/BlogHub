'use client'
import { useEffect, useState } from 'react'
import { Card, Skeleton, CardHeader, CardBody, CardFooter, Image, Chip, Divider } from '@nextui-org/react'
import { remark } from 'remark'
import html from 'remark-html'
import EditArticle from '@/components/EditArticle'
import DeleteArticle from '@/components/DeleteArticle'
import Error from '@/components/Error'
import useAnIssue from '@/hooks/useAnIssue'
import useGetComments from '@/hooks/useGetComments'

interface ArticleProps {
    isLogin: boolean
}
interface Comment {
    id: number
    user: {
        avatar_url: string
        login: string
    }
    body: string
}
export default function Article(props: ArticleProps) {
    const { getAnIssue, issue, error } = useAnIssue()
    const { comments, getComments } = useGetComments()

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

        getComments(issue?.comments_url ?? '')
    }, [number, issue?.comments_url])
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
                                <div className="w-3/5 h-10 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-4/5 rounded-lg">
                                <div className="w-4/5 h-10 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-2/5 rounded-lg">
                                <div className="w-2/5 h-10 rounded-lg bg-default-300"></div>
                            </Skeleton>
                            <Skeleton className="w-3/5 rounded-lg">
                                <div className="w-3/5 h-10 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-4/5 rounded-lg">
                                <div className="w-4/5 h-10 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-2/5 rounded-lg">
                                <div className="w-2/5 h-10 rounded-lg bg-default-300"></div>
                            </Skeleton>
                        </div>
                    </Card>
                )
            ) : (
                <Card
                    shadow="sm"
                    className="md:min-w-[960px] md:max-w-[960px] gap-4  md:p-6 p-4 text-left mt-4 max-w-[400px] min-w-[400px]"
                >
                    <CardHeader className="flex flex-col items-start justify-start">
                        <div className="flex flex-row justify-between w-full">
                            <div className="flex flex-col justify-start gap-1 font-medium text-zinc-700 text-tiny md:gap-2 md:justify-center md:items-center md:flex-row">
                                發布時間：{formattedCreatedAt}
                                {issue?.labels && issue.labels[0] && (
                                    <div className="p-1 text-gray-500 text-tiny flex-item text-start">
                                        | {issue && issue.labels && issue.labels[0]?.name}
                                    </div>
                                )}
                            </div>

                            {isLogin && (
                                <div className="flex items-center justify-center gap-4 md:gap-2">
                                    <EditArticle issue={issue} number={number as number} />
                                    <DeleteArticle issue={issue} number={number as number} />
                                </div>
                            )}
                        </div>
                        <div className=" text-black text-[24px] font-bold">{issue && issue.title}</div>
                    </CardHeader>

                    <CardBody className="mb-2">
                        <div className="text-zinc-700 md:text-md md:font-medium md:justify-self-start">
                            <div
                                className="md:leading-loose"
                                dangerouslySetInnerHTML={{ __html: issue && formatMarkdown(issue.body) }}
                            ></div>
                        </div>
                    </CardBody>

                    {comments && comments.length > 0 && (
                        <>
                            <Divider />
                            <CardFooter className="flex flex-col items-start justify-start">
                                <div className="flex flex-row items-end justify-end w-full">
                                    <div className="ml-2 font-bold text-zinc-700 text-tiny">
                                        {issue.comments} 則留言
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {comments &&
                                        comments.map((comment: Comment, index) => (
                                            <div key={index} className="flex flex-row items-start justify-start gap-2">
                                                <Image
                                                    src={comment.user.avatar_url}
                                                    alt="avatar"
                                                    width={30}
                                                    height={30}
                                                    className="rounded-full"
                                                />
                                                <div className="flex flex-col gap-1 p-3 bg-gray-100 rounded-3xl">
                                                    <p className="text-xs font-bold">{comment.user.login}</p>
                                                    {comment.body}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </CardFooter>
                        </>
                    )}
                </Card>
            )}
        </>
    )
}
