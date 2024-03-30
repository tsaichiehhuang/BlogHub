import { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import MarkdownEditor from '@/components/MarkdownEditor'
import LabelChooser from '@/app/(home)/components/LabelChooser'
import { ValidationError } from '@/types'

interface CreateArticleModalProps {
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
    title: string
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    body: string
    setBody: (body: string) => void
    validationError: ValidationError
    handleCreateIssue: () => void
}

export default function CreateArticleModal(props: CreateArticleModalProps) {
    const { isOpen, onOpenChange, title, handleTitleChange, body, setBody, validationError, handleCreateIssue } = props
    const [selectedLabels, setSelectedLabels] = useState<Array<string>>([])

    return (
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

                            <div className="text-xs text-danger">{validationError ? validationError.body : ' '}</div>

                            <div className="">
                                <div className="mb-1 text-sm">選擇標籤</div>
                                <div className="flex gap-1">
                                    <LabelChooser
                                        selectedLabels={selectedLabels}
                                        setSelectedLabels={setSelectedLabels}
                                    />
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
    )
}
