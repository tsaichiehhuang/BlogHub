import IsLogin from '@/components/IsLogin'
import Article from '@/components/Article'

export default function Page({}) {
    return (
        <div className="p-4">
            <Article isLogin={IsLogin()} />
        </div>
    )
}
