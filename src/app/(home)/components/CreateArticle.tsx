'use client'
import React, { useState, useEffect } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Card,
} from '@nextui-org/react'
import { Octokit } from '@octokit/rest'
import Cookies from 'js-cookie'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import MarkdownEditor from '@/components/MarkdownEditor'
import { Label, ValidationError } from '@/types'

export default function CreateArticle() {
    const token = Cookies.get('access_token')
    const octokit = new Octokit({
        auth: `${token}`,
    })
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [selectedLabels, setSelectedLabels] = useState<Array<string>>([])
    const [body, setBody] = useState('輸入內文')
    const [title, setTitle] = useState('')
    const [validationError, setValidationError] = useState<ValidationError>({ title: '', body: '' })

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
                labels: selectedLabels,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            })

            if (res.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: '文章發表成功',
                    text: '您的文章已成功發布。',
                    confirmButtonText: '確定',
                    timer: 5000,
                })
                setTimeout(() => {
                    location.reload(), 5000
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '發布文章時出錯',
                    text: '抱歉，無法完成文章的發布。請稍後再試。',
                    confirmButtonText: '確定',
                })
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
    const labelName = [
        { name: 'new', color: 'FBCA04' },
        { name: 'hot', color: 'F9D0C4' },
        { name: 'practice', color: 'C5DEF5' },
    ]
    const handleLabelChoose = (label: Label) => {
        const newSelectedLabels = [...selectedLabels]
        if (newSelectedLabels.includes(label.name)) {
            newSelectedLabels.splice(newSelectedLabels.indexOf(label.name), 1)
        } else {
            newSelectedLabels.push(label.name)
        }
        setSelectedLabels(newSelectedLabels)
    }
    return (
        <>
            <Card
                onClick={onOpen}
                isPressable
                shadow="sm"
                className="w-full md:w-4/5 max-h-[140px] gap-4  p-2  text-left "
            >
                <Input
                    key="outside"
                    labelPlacement="outside"
                    placeholder="Hey, Daniel！想發表什麼內容呢？"
                    onChange={handleTitleChange}
                    className="  text-black text-[24px] font-bold"
                    size="lg"
                />
            </Card>
            <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">新增文章</ModalHeader>
                            <ModalBody>
                                <Input
                                    key="outside"
                                    label="標題"
                                    labelPlacement="outside"
                                    placeholder="輸入標題"
                                    value={title}
                                    onChange={handleTitleChange}
                                    errorMessage={validationError ? validationError.title : ' '}
                                />
                                <div className="text-sm">文章內容</div>
                                <MarkdownEditor body={body} setBody={setBody} />

                                <div className="text-xs text-danger">
                                    {validationError ? validationError.body : ' '}
                                </div>

                                <div className="">
                                    <div className="mb-1 text-sm">選擇標籤</div>
                                    <div className="flex gap-1">
                                        {labelName.map((label, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleLabelChoose(label)}
                                                style={{
                                                    backgroundColor: selectedLabels.includes(label.name)
                                                        ? `#${label.color}`
                                                        : 'transparent',
                                                    borderColor: `#${label.color}`,
                                                }}
                                                className="px-2 text-sm bg-transparent border-2 rounded-lg "
                                            >
                                                {label.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={handleCreateIssue}
                                    isDisabled={validationError.title !== '' || validationError.body !== ''}
                                >
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
