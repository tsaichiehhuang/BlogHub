'use client'
import React, { useState } from 'react'
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

export default function CreateComment(props: any) {
    const { number } = props
    const token = Cookies.get('access_token')
    const octokit = new Octokit({
        auth: `${token}`,
    })
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [comment, setComment] = useState('輸入內文')

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value)
    }
    const handleCreateComment = async () => {
        try {
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
                    title: '文章發表成功',
                    text: '您的文章已成功發布。',
                    confirmButtonText: '確定',
                    timer: 5000,
                })
                setTimeout(() => {
                    location.reload(), 5000
                })
            }
        } catch (error: any) {
            console.error('Error creating issue:', error)
        }
    }

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
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button color="primary" onClick={handleCreateComment}>
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
