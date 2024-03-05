'use client'
import React, { useState, useEffect, useContext } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Textarea,
    Input,
} from '@nextui-org/react'
import { Octokit } from '@octokit/rest'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
interface Issue {
    title: string
    body: string
}
interface DeleteArticleProps {
    issue: Issue
    number: number
}
export default function DeleteArticle(props: DeleteArticleProps) {
    const { issue, number } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const token = Cookies.get('access_token')

    const router = useRouter()

    const handleClick = () => {
        onOpen()
    }

    const handleDeleteIssue = async () => {
        const owner = 'tsaichiehhuang'
        const repo = 'TestBlog'
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}`, {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${token}`,
            },
            method: 'PATCH',
            body: JSON.stringify({ state: 'closed' }),
        })
        if (res.status === 200) {
            setTimeout(() => {
                router.push('/')
            }, 1000)
        }
    }
    return (
        <>
            <Button color="default" className="hidden md:block" onClick={handleClick}>
                刪除文章
            </Button>
            <div className="md:hidden block" onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path
                        d="M8.16669 24.5C7.52502 24.5 6.97591 24.2717 6.51935 23.8152C6.0628 23.3586 5.83413 22.8091 5.83335 22.1667V7H4.66669V4.66667H10.5V3.5H17.5V4.66667H23.3334V7H22.1667V22.1667C22.1667 22.8083 21.9384 23.3578 21.4819 23.8152C21.0253 24.2725 20.4758 24.5008 19.8334 24.5H8.16669ZM10.5 19.8333H12.8334V9.33333H10.5V19.8333ZM15.1667 19.8333H17.5V9.33333H15.1667V19.8333Z"
                        fill="black"
                    />
                </svg>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">刪除文章</ModalHeader>
                            <ModalBody className="flex-row whitespace-normal">
                                <div>
                                    確定刪除
                                    <b className="font-lg font-bold">「{issue.title}」</b>嗎？
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button color="default" onPress={onClose} onClick={handleDeleteIssue}>
                                    確定刪除
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
