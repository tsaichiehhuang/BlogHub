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

export default function EditArticle(props) {
    const { issue, number } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const token = Cookies.get('access_token')
    const [body, setBody] = useState(issue.body)
    const [title, setTitle] = useState(issue.title)
    // if (issue.body === undefined) {
    //     setBody(issue.body)
    //     setTitle(issue.title)
    // }
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
    const handleEditIssue = async () => {
        const owner = 'tsaichiehhuang'
        const repo = 'TestBlog'
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}`, {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${token}`,
            },
            method: 'PATCH',
            body: JSON.stringify({ title: title, body: body }),
        })
        if (res.status === 200) {
            setTimeout(() => {
                location.reload()
            }, 1000)
        }
    }
    return (
        <>
            <Button color="primary" onClick={handleClick}>
                編輯文章
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">編輯文章</ModalHeader>
                            <ModalBody>
                                <Input
                                    key="outside"
                                    type="email"
                                    label="標題"
                                    labelPlacement="outside"
                                    placeholder={issue && issue.title}
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                                <Textarea
                                    label="文章內容"
                                    labelPlacement="outside"
                                    placeholder={issue && issue.body}
                                    value={body}
                                    onChange={handleBodyChange}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={handleEditIssue}>
                                    確定新增
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
