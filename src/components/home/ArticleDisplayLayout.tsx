'use client'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
interface label {
    name: string
    color: string
}
export default function ArticleDisplayLayout(issue: any) {
    const router = useRouter()
    const handleClick = () => {
        router.push(`article/${issue.issue.number}`)
    }
    const createdAtDate = new Date(issue.issue.created_at)
    const formattedCreatedAt = createdAtDate ? createdAtDate.toLocaleString() : ''
    return (
        <Card onClick={handleClick} isPressable shadow="sm" className="gap-4 p-4 text-left md:pl-8">
            <CardHeader className="">
                <div className="  text-black text-[24px] font-bold">{issue.issue.title}</div>
            </CardHeader>

            <CardBody className="">
                <div className="font-medium text-zinc-700 text-md justify-self-start">
                    {issue.issue.body.substring(0, 80) + '...'}
                </div>
            </CardBody>

            <CardFooter className="justify-between">
                <div className="font-medium text-zinc-700 text-tiny">發布時間：{formattedCreatedAt}</div>
                <div className="flex flex-row gap-1">
                    {issue.issue.labels[0] &&
                        issue.issue.labels.map((label: label, index: number) => (
                            <div
                                key={index}
                                style={{ backgroundColor: `#${label.color}` }}
                                className="p-1 rounded-lg text-tiny flex-item text-start"
                            >
                                {label.name}
                            </div>
                        ))}
                </div>
            </CardFooter>
        </Card>
    )
}
