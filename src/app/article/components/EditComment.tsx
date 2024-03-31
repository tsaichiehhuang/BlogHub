import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { Image } from '@nextui-org/react'
import {
    Button,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Textarea,
} from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { ValidationError } from '@/types'
import * as Yup from 'yup'

export default function EditComment(props: any) {
    const username = Cookies.get('username')
    const token = Cookies.get('access_token')
    const { comment, isHovered, setIsModalOpen, setIsHovered } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [body, setBody] = useState(comment.body)
    const [validationError, setValidationError] = useState<ValidationError>({ comment: '' })

    const handleClick = () => {
        onOpen()
        setBody(comment.body)
        setIsModalOpen(true)
    }

    const handleEditComment = async (commentId: number) => {
        setIsModalOpen(false)
        onOpenChange()
        setIsHovered(false)
        const validationSchema = Yup.object().shape({
            comment: Yup.string().required('留言不能為空'),
        })
        await validationSchema.validate({ comment: body }, { abortEarly: false })
        const owner = 'tsaichiehhuang'
        const repo = 'TestBlog'
        try {
            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/comments/${commentId}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `token ${token}`,
                    Accept: 'application/vnd.github.v3+json',
                },
                body: JSON.stringify({ body: body }),
                cache: 'no-cache',
            })

            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: '留言編輯成功',
                    confirmButtonText: '確定',
                    timer: 3000,
                })
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '編輯留言時出錯',
                    text: '抱歉，無法完成編輯。請稍後再試。',
                    confirmButtonText: '確定',
                })
            }
        } catch (error) {
            console.error('Error deleting comment:', error)
        }
    }
    useEffect(() => {
        const validateComment = async () => {
            try {
                await Yup.string().required('留言不能為空').validate(body)
                setValidationError((prevErrors: ValidationError) => ({ ...prevErrors, comment: '' }))
            } catch (error: any) {
                setValidationError((prevErrors: ValidationError) => ({ ...prevErrors, comment: error.message }))
            }
        }
        validateComment()
    }, [body])
    return (
        <>
            {comment.user.login === username && isHovered && (
                <>
                    <button className="mt-1" onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 18 21" fill="none">
                            <path
                                d="M4.243 16.6957H0V12.4465L11.435 0.994814C11.6225 0.807068 11.8768 0.701599 12.142 0.701599C12.4072 0.701599 12.6615 0.807068 12.849 0.994814L15.678 3.82695C15.771 3.91996 15.8447 4.03041 15.8951 4.15198C15.9454 4.27356 15.9713 4.40388 15.9713 4.53549C15.9713 4.66709 15.9454 4.79741 15.8951 4.91899C15.8447 5.04056 15.771 5.15101 15.678 5.24402L4.243 16.6957ZM0 18.6987H18V20.7016H0V18.6987Z"
                                fill="gray"
                            />
                        </svg>
                    </button>
                    <Modal
                        isOpen={isOpen}
                        onClose={() => {
                            setIsModalOpen(false)
                            onOpenChange()
                            setIsHovered(false)
                        }}
                        size="3xl"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">編輯留言</ModalHeader>
                                    <ModalBody>
                                        <Textarea
                                            key="outside"
                                            type="email"
                                            label=""
                                            labelPlacement="outside"
                                            value={body}
                                            onChange={(e) => setBody(e.target.value)}
                                            errorMessage={validationError ? validationError.comment : ' '}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="default" variant="light" onPress={onClose}>
                                            取消
                                        </Button>
                                        <Button
                                            color="primary"
                                            onClick={() => handleEditComment(comment.id)}
                                            isDisabled={validationError.comment !== ''}
                                        >
                                            確定編輯
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    )
}
