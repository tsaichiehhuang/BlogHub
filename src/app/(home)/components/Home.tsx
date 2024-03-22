import Header from '@/components/header/Header'
import dynamic from 'next/dynamic'
const Banner = dynamic(() => import('@/app/(home)/components/Banner'), {
    loading: () => <p>Loading...</p>,
})
const AboutMe = dynamic(() => import('@/app/(home)/components/AboutMe'), {
    loading: () => <p>Loading...</p>,
})
const ArticleDisplay = dynamic(() => import('@/app/(home)/components/ArticleDisplay'), {
    loading: () => <p>Loading...</p>,
})
export default function Home() {
    return (
        <main className="flex-col items-center justify-between ">
            <Header />
            <Banner />
            <AboutMe />
            <ArticleDisplay />
        </main>
    )
}
