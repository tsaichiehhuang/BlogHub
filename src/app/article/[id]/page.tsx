import IsLogin from '@/components/IsLogin'
import Article from '@/components/article/ArticleSquare'

export default function Page({}) {
    return (
        <div className="p-4 box-border">
            <Article isLogin={IsLogin()} />
        </div>
    )
}
