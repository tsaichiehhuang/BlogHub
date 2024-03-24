import { Card, Skeleton, CardHeader, CardBody, CardFooter } from '@nextui-org/react'

export default function ArticleDisplayLoading() {
    return (
        <Card shadow="sm" className="p-4 space-y-5 h-72 ">
            <CardHeader className="">
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="w-4/5 h-12 rounded-lg bg-default-200"></div>
                </Skeleton>
            </CardHeader>

            <CardBody className="">
                <Skeleton className="w-full rounded-lg">
                    <div className="w-3/5 h-10 rounded-lg bg-default-200"></div>
                </Skeleton>
            </CardBody>

            <CardFooter className="justify-between">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="w-3/5 h-8 rounded-lg bg-default-200"></div>
                </Skeleton>
            </CardFooter>
        </Card>
    )
}
