import { Image } from '@nextui-org/react'
import { useState } from 'react'

export default function Error(statusCode: any) {
    const [text, setText] = useState('發生錯誤，工程師團隊正在努力修復中！')

    if (statusCode === 404) {
        setText('找不到頁面')
    } else if (statusCode === 403) {
        setText('請求太多次被拒絕了>< 請等一下再來')
    }

    return (
        <div className=" flex flex-col justify-center items-center gap-4  p-4 md:pl-8 text-left mt-4 ">
            <Image alt="avatar" src="/Hands Folder Error.png" width={200} />
            <div className="text-red-500 text-center font-bold mt-4 text-xl"> {text}</div>
        </div>
    )
}
