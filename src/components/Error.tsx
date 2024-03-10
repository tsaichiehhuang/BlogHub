import { Image } from '@nextui-org/react'

export default function Error(error: any) {
    return (
        <div className=" flex flex-col justify-center items-center gap-4  p-4 md:pl-8 text-left mt-4 ">
            <Image alt="avatar" src="/Hands Folder Error.png" width={200} />
            <div className="text-red-500 text-center font-bold mt-4 text-xl"> 發生錯誤，工程師團隊正在努力修復中！</div>
        </div>
    )
}
