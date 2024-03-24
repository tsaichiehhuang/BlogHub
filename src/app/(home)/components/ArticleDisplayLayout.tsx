'use client'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
interface label {
    name: string
    color: string
}
export default function ArticleDisplayLayout(props: any) {
    const { issue } = props
    const router = useRouter()
    const handleClick = () => {
        router.push(`article/${issue.number}`)
    }
    const createdAtDate = new Date(issue.created_at)
    const formattedCreatedAt = createdAtDate
        ? createdAtDate
              .toLocaleString([], {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
              })
              .replace(/(\d+)\/(\d+)\/(\d+),/, '$1/$2/$3,')
        : ''

    return (
        <Card onClick={handleClick} isPressable shadow="sm" className="gap-4 p-4 text-left md:pl-8 ">
            <CardHeader className="">
                <div className="  text-black text-[24px] font-bold">{issue.title}</div>
            </CardHeader>

            <CardBody className="">
                <div className="font-medium text-zinc-700 text-md justify-self-start">
                    {issue.body.substring(0, 80) + '...'}
                </div>
            </CardBody>

            <CardFooter className="justify-between">
                <div className="text-xs font-medium text-zinc-500">{formattedCreatedAt}</div>
                <div className="flex flex-row gap-1">
                    {issue.labels[0] &&
                        issue.labels.map((label: label, index: number) => (
                            <div
                                key={index}
                                style={{ borderBottom: `1.5px solid #${label.color}` }}
                                className="text-[9px]  flex-item text-start"
                            >
                                {label.name}
                            </div>
                        ))}
                </div>
            </CardFooter>
        </Card>
    )
}
