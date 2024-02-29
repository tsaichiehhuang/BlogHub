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

export default function EditArticle(targetIssue: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return (
        <>
            <Button color="primary" onClick={onOpen}>
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
                                    placeholder={targetIssue && targetIssue.targetIssue.title}
                                />
                                <Textarea
                                    label="文章內容"
                                    labelPlacement="outside"
                                    placeholder={targetIssue && targetIssue.targetIssue.body}
                                    className=""
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button color="primary" onPress={onClose}>
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
