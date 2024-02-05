import Image from 'next/image'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import ArticleDisplay from '@/components/ArticleDisplay'

export const metadata: Metadata = {
    title: 'BlogHub',
}

export default function Home() {
    return (
        <main>
            <Header />
            <div className="flex  flex-col items-center justify-between ">
                <div className="grid grid-cols-12 gap-8">
                    <div className="left col-span-4">
                        <div className="w-[370px] gap-4 flex flex-col">
                            <div className="w-[252px] h-[393px] relative ">
                                <div className="left-[60px] top-[245px] absolute text-black text-[40px] font-bold ">
                                    丹尼爾
                                </div>
                                <div className="w-[252px] left-0 top-[318px] absolute text-center text-zinc-700 text-xl font-medium ">
                                    丹尼爾是一名工程師,他過往學一些人使用 GitHub Issue 來充當自己的部落格。
                                </div>
                                <img className="spt-6 left-[15px] top-0 absolute" src="/avatar.png" />
                            </div>
                            <div className="w-[252px] h-[118px] relative ">
                                <div className="w-[252px] left-0 top-0 absolute text-center text-zinc-700 text-xl font-medium ">
                                    Follow me!
                                </div>
                                <div className="w-[252px] h-[58px] left-0 top-[60px] absolute">
                                    <div className="w-[252px] left-0 top-0 absolute text-zinc-700 text-xl font-medium">
                                        Email
                                    </div>
                                    <div className="w-[252px] left-0 top-[33px] absolute text-zinc-700 text-xl font-medium ">
                                        Github
                                    </div>
                                </div>
                            </div>
                            <div className="w-[298px] h-11 text-neutral-600 text-base font-normal">
                                關於我們 · 隱私權條款 · Cookie 條款 · <br />© 2024 Daniel Blog.
                            </div>
                        </div>
                    </div>
                    <div className="right flex-col grid  gap-4 col-span-8 ">
                        <ArticleDisplay />
                        <ArticleDisplay />
                        <ArticleDisplay />
                    </div>
                </div>
            </div>
        </main>
    )
}
