import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from '@nextui-org/react'
import { Comment } from '@/types'

export default function DeleteComment(props: any) {
    const { comment, setIsModalOpen, setHoverComment, setComments, setCommentCount } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const token = Cookies.get('access_token')
    const handleClick = () => {
        onOpen()
        setIsModalOpen(true)
    }
    const handleDeleteComment = async (commentId: number) => {
        onOpenChange()
        setIsModalOpen(false)

        const owner = 'tsaichiehhuang'
        const repo = 'TestBlog'
        try {
            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `token ${token}`,
                    Accept: 'application/vnd.github.v3+json',
                },
                cache: 'no-cache',
            })

            if (res.status === 204) {
                setComments((prevComments: any) => {
                    const index = prevComments.findIndex((c: Comment) => c.id === comment.id)
                    if (index !== -1) {
                        const updatedComments = [...prevComments]
                        updatedComments.splice(index, 1)
                        return updatedComments
                    }
                    return prevComments
                })
                setCommentCount((prevCount: number) => prevCount - 1)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '刪除留言時出錯',
                    text: '抱歉，無法完成刪除留言。請稍後再試。',
                    confirmButtonText: '確定',
                })
            }
        } catch (error) {
            console.error('Error deleting comment:', error)
        }
    }
    return (
        <>
            <button className="mt-1" onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 28 28" fill="none">
                    <path
                        d="M8.16669 24.5C7.52502 24.5 6.97591 24.2717 6.51935 23.8152C6.0628 23.3586 5.83413 22.8091 5.83335 22.1667V7H4.66669V4.66667H10.5V3.5H17.5V4.66667H23.3334V7H22.1667V22.1667C22.1667 22.8083 21.9384 23.3578 21.4819 23.8152C21.0253 24.2725 20.4758 24.5008 19.8334 24.5H8.16669ZM10.5 19.8333H12.8334V9.33333H10.5V19.8333ZM15.1667 19.8333H17.5V9.33333H15.1667V19.8333Z"
                        fill="gray"
                    />
                </svg>
            </button>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    onOpenChange()
                    setHoverComment(null)
                }}
                size="3xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">刪除留言</ModalHeader>
                            <ModalBody>
                                <div>
                                    確定刪除
                                    <b className="font-bold font-lg">「{comment.body}」</b>嗎？
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button color="primary" onClick={() => handleDeleteComment(comment.id)}>
                                    確定刪除
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
