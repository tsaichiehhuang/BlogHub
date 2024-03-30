import IsLogin from '@/components/IsLogin'
import ArticleSquare from '@/app/article/components/ArticleSquare'
import { cookies } from 'next/headers'

export default function Page({}) {
    const { isAuthorLogin, isUserLogin } = IsLogin()
    const userAvatar = cookies().get('userAvatar')?.value

    return (
        <div className="box-border p-4 w-full items-center justify-center flex">
            <ArticleSquare isAuthorLogin={isAuthorLogin} isUserLogin={isUserLogin} userAvatar={userAvatar} />
        </div>
    )
}
