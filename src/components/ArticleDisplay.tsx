import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react'

import { useRouter } from 'next/navigation'

export default function ArticleDisplay() {
    return (
        <div className="w-[717px] h-[388px] relative col-start-2">
            <div className="w-full h-[388px] left-0 top-0 absolute bg-white border-b border-neutral-500" />
            <div className="w-[605px] h-[281px] left-[56px] top-[47px] absolute">
                <div className="w-[605px] left-0 top-0 absolute text-black text-[32px] font-bold">
                    優化部落格體驗：用React.js串接GitHub API的冒險
                </div>
                <div className="w-[605px] h-[100px] left-0 top-[104px] absolute text-zinc-700 text-xl font-medium ">
                    在這個資訊爆炸的時代，分享知識的方式變得越來越多樣化。對於工程師來說，GitHub已經不僅僅是程式碼的存放庫，還是一個豐富的知識分享平台。本文將介紹一位工程師丹尼爾的故事，他如何利用React.js串接GitHub
                    API，優化自己的部落格體驗。
                </div>
                <div className="w-[605px] h-[35px] left-0 top-[246px] absolute">
                    <div className="left-0 top-[5px] absolute text-zinc-700 text-xl font-medium ">
                        發布時間：2024/01/01
                    </div>
                    <div className="w-[218px] h-[35px] left-[387px] top-0 absolute">
                        <div className="w-[82px] h-[35px] px-5 py-[3px] left-0 top-0 absolute bg-zinc-300 rounded-[20px] justify-center items-center gap-2.5 inline-flex">
                            <div className="text-center text-zinc-700 text-xl font-medium  tracking-widest">標籤</div>
                        </div>
                        <div className="w-[126px] h-[35px] px-5 py-[3px] left-[92px] top-0 absolute bg-zinc-300 rounded-[20px] justify-center items-center gap-2.5 inline-flex">
                            <div className="text-center text-zinc-700 text-xl font-medium  tracking-widest">
                                標籤標籤
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
