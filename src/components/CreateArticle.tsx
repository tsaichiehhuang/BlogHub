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

export default function CreateArticle() {
    const token = Cookies.get('access_token')
    const octokit = new Octokit({
        auth: `${token}`,
    })
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [body, setBody] = useState('')
    const [title, setTitle] = useState('')
    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleCreateIssue = async () => {
        const res = await octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: 'tsaichiehhuang',
            repo: 'TestBlog',
            title: `${title}`,
            body: `${body}`,
            // labels: ['bug'],
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        })

        if (res.status === 201) {
            location.reload()
        }
    }

    return (
        <>
            <Button color="primary" onClick={onOpen}>
                新增文章
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">新增文章</ModalHeader>
                            <ModalBody>
                                <Input
                                    key="outside"
                                    type="email"
                                    label="標題"
                                    labelPlacement="outside"
                                    placeholder="輸入標題"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                                <Textarea
                                    label="文章內容"
                                    labelPlacement="outside"
                                    placeholder="輸入內文"
                                    value={body}
                                    onChange={handleBodyChange}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={handleCreateIssue}>
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
