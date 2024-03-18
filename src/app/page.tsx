import Header from '@/components/header/Header'
import ArticleDisplay from '@/components/home/ArticleDisplay'
import AboutMe from '@/components/home/AboutMe'
import Banner from '@/components/home/Banner'

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
