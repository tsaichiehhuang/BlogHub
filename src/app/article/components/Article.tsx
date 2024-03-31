import { Card, CardHeader, CardBody, CardFooter, Image, Divider } from '@nextui-org/react'
import { remark } from 'remark'
import html from 'remark-html'
import { Label, Comment } from '@/types'
import EditArticle from '@/app/article/components/EditArticle'
import DeleteArticle from '@/app/article/components/DeleteArticle'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const CreateComment = dynamic(() => import('@/app/article/components/CreateComment'))
const DeleteComment = dynamic(() => import('@/app/article/components/DeleteComment'))
const EditComment = dynamic(() => import('@/app/article/components/EditComment'))

export default function Article(props: any) {
    const { issue, comments, isAuthorLogin, isUserLogin, number, userAvatar } = props
    const createdAtDate = issue ? new Date(issue.created_at) : null

    const [isHovered, setIsHovered] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    console.log('isModalOpen', isModalOpen)
    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }
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
    const formatMarkdown = (markdownContent: string) => {
        const result = remark().use(html).processSync(markdownContent)
        return result.toString()
    }

    return (
        <Card shadow="sm" className="md:min-w-[960px] md:max-w-[960px] gap-4  md:p-10 p-4 text-left mt-4 w-full  ">
            <CardHeader className="flex flex-col items-start justify-start gap-4">
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-start gap-2 font-medium text-zinc-700 text-tiny md:gap-2 md:justify-center md:items-center md:flex-row">
                        {formattedCreatedAt}
                        {issue?.labels?.length !== 0 && <div className="hidden md:flex">|</div>}
                        <div className="flex flex-row gap-1">
                            {issue?.labels &&
                                issue.labels.map((label: Label, index: number) => (
                                    <div
                                        key={index}
                                        style={{ borderBottom: `1.5px solid #${label.color}` }}
                                        className="text-xs flex-item text-start"
                                    >
                                        {label.name}
                                    </div>
                                ))}
                        </div>
                    </div>

                    {isAuthorLogin && (
                        <div className="flex items-center justify-center gap-4 md:gap-2">
                            <EditArticle issue={issue} number={number as number} />
                            <DeleteArticle issue={issue} number={number as number} />
                        </div>
                    )}
                </div>
                <div className=" text-black text-[24px] font-bold">{issue && issue.title}</div>
            </CardHeader>

            <CardBody className="mb-2">
                <article
                    className="w-11/12 prose md:leading-loose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: issue ? formatMarkdown(issue.body) : '' }}
                ></article>
            </CardBody>

            {comments && comments.length > 0 && (
                <>
                    <Divider />
                    <CardFooter className="flex flex-col items-start justify-start">
                        <div className="flex flex-row items-end justify-end w-full">
                            <div className="ml-2 font-bold text-zinc-700 text-tiny">{issue?.comments} 則留言</div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            {comments &&
                                comments.map((comment: Comment, index: number) => (
                                    <div
                                        key={index}
                                        className="flex flex-row items-start justify-start gap-2 w-full"
                                        onMouseEnter={() => !isModalOpen && handleMouseEnter()}
                                        onMouseLeave={() => !isModalOpen && handleMouseLeave()}
                                    >
                                        <Image
                                            src={comment.user.avatar_url}
                                            alt="avatar"
                                            width={30}
                                            height={30}
                                            className="rounded-full"
                                        />
                                        <div className="flex flex-col gap-1 p-3 bg-gray-100 rounded-3xl md:max-w-xl max-w-64">
                                            <p className="text-xs font-bold">{comment.user.login}</p>
                                            {comment.body}
                                        </div>
                                        <DeleteComment
                                            comment={comment}
                                            isHovered={isHovered}
                                            setIsModalOpen={setIsModalOpen}
                                            setIsHovered={setIsHovered}
                                        />
                                        <EditComment
                                            comment={comment}
                                            isHovered={isHovered}
                                            setIsModalOpen={setIsModalOpen}
                                            setIsHovered={setIsHovered}
                                        />
                                    </div>
                                ))}
                        </div>
                    </CardFooter>
                </>
            )}
            {(isAuthorLogin || isUserLogin) && (
                <CardFooter className="flex flex-row items-start justify-start w-full gap-2">
                    <Image src={userAvatar} alt="avatar" width={30} height={30} className="rounded-full" />
                    <CreateComment number={number} />
                </CardFooter>
            )}
        </Card>
    )
}
