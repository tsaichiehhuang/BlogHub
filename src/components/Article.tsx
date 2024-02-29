'use client'
import useGetIssues from '@/hooks/useGetIssues'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Chip, Divider } from '@nextui-org/react'
import { remark } from 'remark'
import html from 'remark-html'
import EditArticle from '@/components/EditArticle'
import Cookies from 'js-cookie'

export default function Article(isLoign: boolean) {
    const path = window.location.pathname
    const parts = path.split('/')
    const number = parseInt(parts[parts.length - 1])
    const [issue, setIssue] = useState({} as any)
    const token = Cookies.get('access_token')
    const owner = 'tsaichiehhuang'
    const repo = 'TestBlog'
    const getAnIssues = async () => {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}`, {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${token}`,
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
    const formatMarkdown = (markdownContent) => {
        const result = remark().use(html).processSync(markdownContent)
        return result.toString()
    }
    return (
        <Card shadow="sm" className="max-w-[1200px] gap-4  p-4 pl-8 text-left mt-4">
            <CardHeader className="justify-between ">
                <div
                    className=" text-zinc-700 text-tiny font-medium gap-2 flex justify-center items-center flex-row"
                    style={{ width: `${formattedCreatedAt.length * 16}px` }}
                >
                    發布時間：{formattedCreatedAt}
                    <Chip className="bg-zinc-100 text-tiny p-1 flex-item text-center" size="sm">
                        {issue && issue.labels && issue.labels[0]?.name}
                    </Chip>
                </div>

                {isLoign && <EditArticle issue={issue} number={number} />}
            </CardHeader>

            <div className="  text-black text-[32px] font-bold">{issue && issue.title}</div>
            <CardBody className="">
                <div className="text-zinc-700 text-xl font-medium justify-self-start">
                    <div
                        className="leading-loose"
                        dangerouslySetInnerHTML={{ __html: issue && formatMarkdown(issue.body) }}
                    ></div>
                </div>
            </CardBody>
        </Card>
    )
}
