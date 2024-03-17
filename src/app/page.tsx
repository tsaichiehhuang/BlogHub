import Image from 'next/image'
import type { Metadata } from 'next'
import Header from '@/components/header/Header'
import ArticleDisplay from '@/components/home/ArticleDisplay'
import AboutMe from '@/components/home/AboutMe'
import AddArticle from '@/components/home/CreateArticle'
import IsLogin from '@/components/IsLogin'

export default function Home() {
    return (
        <>
            <Header />
            <main className="p-4 mt-2 flex-col items-center justify-between ">
                <div className="grid md:grid-cols-12  sm:flex-col">
                    <div className="md:left md:col-span-3 md:col-start-2">
                        <AboutMe />
                    </div>
                    <div className="flex-col grid gap-4 md:col-span-6 md:col-start-6 ">
                        {IsLogin() && <AddArticle />}
                        <ArticleDisplay />
                    </div>
                </div>
            </main>
        </>
    )
}
