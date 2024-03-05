import Image from 'next/image'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import ArticleDisplay from '@/components/ArticleDisplay'
import AboutMe from '@/components/AboutMe'
import AddArticle from '@/components/CreateArticle'
import IsLogin from '@/components/IsLogin'

export default function Home() {
    return (
        <>
            <Header />
            <main className="p-4 md:p-24 flex-col items-center justify-between ">
                <div className="grid md:grid-cols-12 gap-8 sm:flex-col">
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
