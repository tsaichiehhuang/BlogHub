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
import * as Yup from 'yup'

export default function CreateArticle() {
    const token = Cookies.get('access_token')
    const octokit = new Octokit({
        auth: `${token}`,
    })
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [body, setBody] = useState('')
    const [title, setTitle] = useState('')
    const [validationError, setValidationError] = useState(null)

    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleCreateIssue = async () => {
        try {
            const validationSchema = Yup.object().shape({
                title: Yup.string().required('標題為必填'),
                body: Yup.string().min(30, '內容至少要30個字').required('文章內容為必填'),
            })

            await validationSchema.validate({ title, body }, { abortEarly: false })

            const res = await octokit.request('POST /repos/{owner}/{repo}/issues', {
                owner: 'tsaichiehhuang',
                repo: 'TestBlog',
                title,
                body,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            })

            if (res.status === 201) {
                location.reload()
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                const errors = error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message
                    return acc
                }, {})
                setValidationError(errors)
            } else {
                console.error('Error creating issue:', error)
            }
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
                                <>
                                    <Input
                                        key="outside"
                                        type="email"
                                        label="標題"
                                        labelPlacement="outside"
                                        placeholder="輸入標題"
                                        value={title}
                                        onChange={handleTitleChange}
                                    />
                                    {validationError ? (
                                        <div className="text-red-500">{validationError.title}</div>
                                    ) : (
                                        <div className="w-4 h-6 "></div>
                                    )}
                                </>
                                <>
                                    <Textarea
                                        label="文章內容"
                                        labelPlacement="outside"
                                        placeholder="輸入內文"
                                        value={body}
                                        onChange={handleBodyChange}
                                    />
                                    {validationError ? (
                                        <div className="text-red-500">{validationError.body}</div>
                                    ) : (
                                        <div className="w-4 h-6"></div>
                                    )}{' '}
                                </>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button color="primary" onClick={handleCreateIssue}>
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
