import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { Image } from '@nextui-org/react'

export default function DeleteComment(props: any) {
    const username = Cookies.get('username')
    const token = Cookies.get('access_token')
    const { comment, isHovered } = props
    const handleDeleteComment = async (commentId: number) => {
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
                Swal.fire({
                    icon: 'success',
                    title: '留言刪除成功',
                    confirmButtonText: '確定',
                    timer: 3000,
                })
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
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
            <Image src={comment.user.avatar_url} alt="avatar" width={30} height={30} className="rounded-full" />
            <div className="flex flex-col gap-1 p-3 bg-gray-100 rounded-3xl md:max-w-xl max-w-64">
                <p className="text-xs font-bold">{comment.user.login}</p>
                {comment.body}
            </div>
            {comment.user.login === username && isHovered && (
                <button className="mt-1" onClick={() => handleDeleteComment(comment.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 28 28" fill="none">
                        <path
                            d="M8.16669 24.5C7.52502 24.5 6.97591 24.2717 6.51935 23.8152C6.0628 23.3586 5.83413 22.8091 5.83335 22.1667V7H4.66669V4.66667H10.5V3.5H17.5V4.66667H23.3334V7H22.1667V22.1667C22.1667 22.8083 21.9384 23.3578 21.4819 23.8152C21.0253 24.2725 20.4758 24.5008 19.8334 24.5H8.16669ZM10.5 19.8333H12.8334V9.33333H10.5V19.8333ZM15.1667 19.8333H17.5V9.33333H15.1667V19.8333Z"
                            fill="gray"
                        />
                    </svg>
                </button>
            )}
        </>
    )
}
