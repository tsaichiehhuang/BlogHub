'use client'
import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Chip, Divider } from '@nextui-org/react'

import { useRouter } from 'next/navigation'

export default function ArticleDisplay() {
    let issues: any
    useEffect(() => {
        const owner = 'tsaichiehhuang'
        const repo = 'tsaichiehhuang'

        const fetchIssues = async () => {
            try {
                const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
                    headers: {
                        Accept: 'application/json',
                    },
                    method: 'GET',
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch issues')
                }

                const issues = await response.json()

                issues.forEach((issue: any) => {
                    const title = issue.title // 獲取 issue 的 title
                    const body = issue.body // 獲取 issue 的 body

                    console.log('Title:', title)
                    console.log('Body:', body)
                })
            } catch (error) {
                console.error('Error fetching issues:', error)
            }
        }

        fetchIssues()
    }, [])

    return (
        <Card isPressable shadow="sm" className="max-w-[700px] gap-4  p-4 pl-8 text-left border-b border-black">
            <CardHeader className="">
                <div className="  text-black text-[32px] font-bold">優化部落格體驗：用React.js串接GitHub API的冒險</div>
            </CardHeader>
            <Divider />
            <CardBody className="">
                <div className="text-zinc-700 text-xl font-medium justify-self-start">
                    在這個資訊爆炸的時代，分享知識的方式變得越來越多樣化。對於工程師來說，GitHub已經不僅僅是程式碼的存放庫，還是一個豐富的知識分享平台。本文將介紹一位工程師丹尼爾的故事，他如何利用React.js串接GitHub
                    API，優化自己的部落格體驗。
                </div>
            </CardBody>
            <Divider />
            <CardFooter className="justify-between">
                <div className=" text-zinc-700 text-tiny font-medium ">發布時間：2024/01/01</div>

                <Chip className="bg-zinc-300 text-tiny px-4" size="sm">
                    tag
                </Chip>
            </CardFooter>
        </Card>
    )
}
