import Header from '@/components/header/Header'
import Banner from '@/app/(home)/components/Banner'
import dynamic from 'next/dynamic'
const AboutMe = dynamic(() => import('@/app/(home)/components/AboutMe'))
const ArticleDisplay = dynamic(() => import('@/app/(home)/components/ArticleDisplay'))
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
