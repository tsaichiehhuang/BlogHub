'use client'
import useGetIssues from '@/hooks/useGetIssues'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Chip, Divider } from '@nextui-org/react'
import { remark } from 'remark'
import html from 'remark-html'

export default function Page({}) {
    const path = window.location.pathname
    const parts = path.split('/')
    const number = parseInt(parts[parts.length - 1])

    const { getIssues, issues } = useGetIssues()

    useEffect(() => {
        getIssues()
    }, [])

    const targetIssue = issues.find((issue: any) => issue.number === number)
    const createdAtDate = targetIssue ? new Date(targetIssue.created_at) : null

    const formattedCreatedAt = createdAtDate ? createdAtDate.toLocaleString() : ''
    const formatMarkdown = (markdownContent) => {
        const result = remark().use(html).processSync(markdownContent)
        return result.toString()
    }
    return (
        <Card shadow="sm" className="max-w-[1000px] gap-4  p-4 pl-8 text-left mt-4">
            <CardHeader className="">
                <div
                    className="flex-item text-zinc-700 text-tiny font-medium  "
                    style={{ width: `${formattedCreatedAt.length * 16}px` }}
                >
                    發布時間：{formattedCreatedAt}
                </div>
                <Chip
                    className="bg-zinc-300 text-tiny p-1 flex-item text-center rounded-sm"
                    size="sm"
                    // style={{ width: `${(targetIssue && targetIssue.labels[0].name.length) * 16}px` }}
                >
                    {/* {targetIssue && targetIssue.labels[0]?.name} */}
                </Chip>
            </CardHeader>
            <div className="  text-black text-[32px] font-bold">{targetIssue && targetIssue.title}</div>
            <CardBody className="">
                <div className="text-zinc-700 text-xl font-medium justify-self-start">
                    {/* {targetIssue && formatMarkdown(targetIssue.body)} */}
                    <div
                        className=""
                        dangerouslySetInnerHTML={{ __html: targetIssue && formatMarkdown(targetIssue.body) }}
                    ></div>
                </div>
            </CardBody>
        </Card>
    )
}
