import Image from 'next/image'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import ArticleDisplay from '@/components/ArticleDisplay'
import AboutMe from '@/components/AboutMe'

export const metadata: Metadata = {
    title: 'BlogHub',
}

export default function Home() {
    return (
        <main>
            <Header />
            <div className="p-24 flex-col items-center justify-between ">
                <div className="grid grid-cols-12 gap-8">
                    <div className="left col-span-3 col-start-2">
                        <AboutMe />
                    </div>
                    <div className="flex-col grid gap-4 col-span-6 col-start-6 ">
                        <ArticleDisplay />
                        <ArticleDisplay />
                        <ArticleDisplay />
                    </div>
                </div>
            </div>
        </main>
    )
}
