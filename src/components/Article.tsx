'use client'
import useGetIssues from '@/hooks/useGetIssues'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Chip, Divider } from '@nextui-org/react'
import { remark } from 'remark'
import html from 'remark-html'
import EditArticle from '@/components/EditArticle'
import DeleteArticle from '@/components/DeleteArticle'
import Cookies from 'js-cookie'

export default function Article(props) {
    const { isLogin } = props
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
                // Authorization: `Bearer ${token}`,
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
        <Card shadow="sm" className="md:max-w-[1200px] gap-4  md:p-6 p-4 text-left mt-4">
            <CardHeader className="justify-between flex">
                <div className=" text-zinc-700 text-tiny font-medium md:gap-2 gap-1 flex md:justify-center justify-start md:items-center md:flex-row flex-col">
                    發布時間：{formattedCreatedAt}
                    <Chip className="bg-zinc-100 text-tiny p-1 flex-item text-center" size="sm">
                        {issue && issue.labels && issue.labels[0]?.name}
                    </Chip>
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
