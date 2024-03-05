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
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from '@nextui-org/react'
import { Octokit } from '@octokit/rest'
import Cookies from 'js-cookie'
import * as Yup from 'yup'
interface ValidationError {
    title: string
    body: string
}
export default function CreateArticle() {
    const token = Cookies.get('access_token')
    const octokit = new Octokit({
        auth: `${token}`,
    })
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [body, setBody] = useState('')
    const [title, setTitle] = useState('')
    const [validationError, setValidationError] = useState<ValidationError>({ title: '', body: '' })
    const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBody(e.target.value)
    }
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                const validationError = error as Yup.ValidationError

                const errors = validationError.inner.reduce((acc: any, curr: any) => {
                    acc[curr.path] = curr.message
                    return acc
                }, {})
                setValidationError(errors)
            } else {
                console.error('Error creating issue:', error)
            }
        }
    }
    useEffect(() => {
        const validateTitle = async () => {
            try {
                await Yup.string().required('標題為必填').validate(title)
                setValidationError((prevErrors: ValidationError) => ({ ...prevErrors, title: '' }))
            } catch (error: any) {
                setValidationError((prevErrors: ValidationError) => ({ ...prevErrors, title: error.message }))
            }
        }
        validateTitle()
    }, [title])

    useEffect(() => {
        const validateBody = async () => {
            try {
                await Yup.string().min(30, '內容至少要30個字').required('文章內容為必填').validate(body)
                setValidationError((prevErrors: ValidationError) => ({ ...prevErrors, body: '' }))
            } catch (error: any) {
                setValidationError((prevErrors: ValidationError) => ({ ...prevErrors, body: error.message }))
            }
        }
        validateBody()
    }, [body])

    return (
        <>
            <Card onClick={onOpen} isPressable shadow="sm" className=" gap-4  p-4 pl-8 text-left ">
                <CardBody className="">
                    <Input
                        key="outside"
                        label="新增文章"
                        labelPlacement="outside"
                        placeholder="想發表什麼內容呢？"
                        onChange={handleTitleChange}
                        className="  text-black text-[28px] font-bold"
                        size="lg"
                    />
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">新增文章</ModalHeader>
                            <ModalBody>
                                <>
                                    <Input
                                        key="outside"
                                        label="標題"
                                        labelPlacement="outside"
                                        placeholder="輸入標題"
                                        value={title}
                                        onChange={handleTitleChange}
                                        errorMessage={validationError ? validationError.title : ' '}
                                    />
                                </>
                                <>
                                    <Textarea
                                        label="文章內容"
                                        labelPlacement="outside"
                                        placeholder="輸入內文"
                                        value={body}
                                        onChange={handleBodyChange}
                                        errorMessage={validationError ? validationError.body : ' '}
                                    />
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
