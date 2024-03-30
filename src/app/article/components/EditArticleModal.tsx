import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import MarkdownEditor from '@/components/MarkdownEditor'
import { ValidationError } from '@/types'

interface EditArticleModalProps {
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
    title: string
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    body: string | undefined
    setBody: (body: string) => void
    validationError: ValidationError
    handleEditIssue: () => void
}

export default function EditArticleModal(props: EditArticleModalProps) {
    const { isOpen, onOpenChange, title, handleTitleChange, body, setBody, validationError, handleEditIssue } = props
    return (
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
                                value={title}
                                onChange={handleTitleChange}
                                errorMessage={validationError ? validationError.title : ' '}
                            />
                            <div className="text-sm">文章內容</div>
                            <MarkdownEditor body={body || ''} setBody={setBody} />

                            <div className="text-xs text-danger">{validationError ? validationError.body : ' '}</div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                取消
                            </Button>
                            <Button
                                color="primary"
                                onPress={onClose}
                                onClick={handleEditIssue}
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
