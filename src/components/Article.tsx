'use client'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Chip, Divider } from '@nextui-org/react'
import { remark } from 'remark'
import html from 'remark-html'
import EditArticle from '@/components/EditArticle'
import DeleteArticle from '@/components/DeleteArticle'
import Cookies from 'js-cookie'

interface ArticleProps {
    isLogin: boolean
}
export default function Article(props: ArticleProps) {
    const [number, setNumber] = useState(0)
    const { isLogin } = props
    if (typeof window !== 'undefined') {
        const path = window.location.pathname
        const parts = path.split('/')
        setNumber(parseInt(parts[parts.length - 1]))
    }

    const [issue, setIssue] = useState({} as any)
    const owner = 'tsaichiehhuang'
    const repo = 'TestBlog'
    const getAnIssues = async () => {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}`, {
            headers: {
                Accept: 'application/vnd.github+json',
            },
            method: 'GET',
        })
        setIssue(await res.json())
    }
    useEffect(() => {
        getAnIssues()
    }, [])

    const createdAtDate = issue ? new Date(issue.created_at) : null

    const formattedCreatedAt = createdAtDate ? createdAtDate.toLocaleString() : ''
    const formatMarkdown = (markdownContent: string) => {
        const result = remark().use(html).processSync(markdownContent)
        return result.toString()
    }
    return (
        <Card shadow="sm" className="md:max-w-[1200px] gap-4  md:p-6 p-4 text-left mt-4">
            <CardHeader className="justify-between flex">
                <div className=" text-zinc-700 text-tiny font-medium md:gap-2 gap-1 flex md:justify-center justify-start md:items-center md:flex-row flex-col">
                    發布時間：{formattedCreatedAt}
                    {issue.labels && issue.labels[0] && (
                        <div className="text-gray-500 text-tiny p-1 flex-item text-start">
                            | {issue && issue.labels && issue.labels[0]?.name}
                        </div>
                    )}
                </div>

                {isLogin && (
                    <div className="md:gap-2 gap-4 flex justify-center items-center">
                        <EditArticle issue={issue} number={number} />
                        <DeleteArticle issue={issue} number={number} />
                    </div>
                )}
            </CardHeader>

            <div className="  text-black text-[32px] font-bold">{issue && issue.title}</div>
            <CardBody className="">
                <div className="text-zinc-700 md:text-xl md:font-medium md:justify-self-start">
                    <div
                        className="md:leading-loose"
                        dangerouslySetInnerHTML={{ __html: issue && formatMarkdown(issue.body) }}
                    ></div>
                </div>
            </CardBody>
        </Card>
    )
}
