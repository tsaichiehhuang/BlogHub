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
    Textarea,
    Input,
} from '@nextui-org/react'
import { Octokit } from '@octokit/rest'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { ValidationError } from '@/types'

export default function CreateComment(props: any) {
    const { number } = props
    const token = Cookies.get('access_token')
    const octokit = new Octokit({
        auth: `${token}`,
    })
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [comment, setComment] = useState('')
    const [validationError, setValidationError] = useState<ValidationError>({ comment: '' })

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value)
    }
    const handleCreateComment = async () => {
        try {
            const validationSchema = Yup.object().shape({
                comment: Yup.string().required('留言不能為空'),
            })
            await validationSchema.validate({ comment }, { abortEarly: false })
            const res = await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
                owner: 'tsaichiehhuang',
                repo: 'TestBlog',
                issue_number: number,
                body: comment,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            })

            if (res.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: '留言發表成功',
                    confirmButtonText: '確定',
                    timer: 3000,
                })
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '留言發布錯誤',
                    text: '抱歉，無法留言。',
                    confirmButtonText: '確定',
                })
            }
        } catch (error: any) {
            setValidationError(error.message)

            console.error('Error creating issue:', error)
        }
    }
    useEffect(() => {
        const validateComment = async () => {
            try {
                await Yup.string().required('留言不能為空').validate(comment)
                setValidationError((prevErrors: ValidationError) => ({ ...prevErrors, comment: '' }))
            } catch (error: any) {
                setValidationError((prevErrors: ValidationError) => ({ ...prevErrors, comment: error.message }))
            }
        }
        validateComment()
    }, [comment])
    return (
        <>
            <Input
                onClick={onOpen}
                key="outside"
                labelPlacement="outside"
                placeholder="留言..."
                className=" text-black text-[24px] font-bold"
                size="lg"
            />

            <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">新增留言</ModalHeader>
                            <ModalBody>
                                <Textarea
                                    key="outside"
                                    label=""
                                    labelPlacement="outside"
                                    placeholder="輸入留言..."
                                    onChange={handleCommentChange}
                                    errorMessage={validationError ? validationError.comment : ' '}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={handleCreateComment}
                                    isDisabled={validationError.comment !== ''}
                                >
                                    確定留言
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
