import { Card, Skeleton, CardHeader, CardBody, CardFooter } from '@nextui-org/react'

export function ArticleDisplayLoading() {
    return (
        <Card shadow="sm" className="h-72 space-y-5  p-4 md:pl-8 ">
            <CardHeader className="">
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-12 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </CardHeader>

            <CardBody className="">
                <Skeleton className="w-full rounded-lg">
                    <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </CardBody>

            <CardFooter className="justify-between">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-8 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </CardFooter>
        </Card>
    )
}
