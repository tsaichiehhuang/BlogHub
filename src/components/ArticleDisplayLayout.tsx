'use client'

import React, { useState, useEffect, useContext } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Chip, Divider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export default function ArticleDisplayLayout(issue: any) {
    const router = useRouter()
    const handleClick = () => {
        router.push(`article/${issue.issue.number}`)
    }
    const createdAtDate = new Date(issue.issue.created_at)
    const formattedCreatedAt = createdAtDate ? createdAtDate.toLocaleString() : ''
    return (
        <Card onClick={handleClick} isPressable shadow="sm" className=" gap-4  p-4 md:pl-8 text-left ">
            <CardHeader className="">
                <div className="  text-black text-[24px] font-bold">{issue.issue.title}</div>
            </CardHeader>

            <CardBody className="">
                <div className="text-zinc-700 text-md font-medium justify-self-start">
                    {issue.issue.body.substring(0, 80) + '...'}
                </div>
            </CardBody>

            <CardFooter className="justify-between">
                <div className=" text-zinc-700 text-tiny font-medium ">發布時間：{formattedCreatedAt}</div>
                {issue.issue.labels[0] && (
                    <div className="text-gray-500 text-tiny p-1 flex-item text-start">
                        {issue.issue.labels[0]?.name}
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}
