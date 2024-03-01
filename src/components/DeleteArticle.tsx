'use client'
import React, { useState, useEffect, useContext } from 'react'
import useGetIssues from '@/hooks/useGetIssues'
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

export default function DeleteArticle(props) {
    const { issue, number } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const token = Cookies.get('access_token')
    const [body, setBody] = useState(issue.body)
    const [title, setTitle] = useState(issue.title)
    const router = useRouter()

    const handleClick = () => {
        onOpen()
        setBody(issue.body)
        setTitle(issue.title)
    }
    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
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
            <Button color="default" onClick={handleClick}>
                刪除文章
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">刪除文章</ModalHeader>
                            <ModalBody className="flex-row">
                                確定刪除<b className="font-lg font-bold">「{title}」</b>嗎？
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
