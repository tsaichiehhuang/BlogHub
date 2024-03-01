import IsLogin from '@/components/IsLogin'
import EditArticle from '@/components/EditArticle'
import Article from '@/components/Article'

export default function Page({}) {
    return (
        <>
            <Article isLogin={IsLogin()} />
        </>
    )
}
