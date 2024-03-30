import { Card, Skeleton } from '@nextui-org/react'

export default function ArticleLoading() {
    return (
        <Card shadow="sm" className="w-full md:min-w-[960px] md:max-w-[960px] gap-4  md:p-10 p-4 text-left mt-4">
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
}
