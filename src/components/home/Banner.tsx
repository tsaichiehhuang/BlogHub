import { Image } from '@nextui-org/react'
import AddArticle from '@/components/home/CreateArticle'
import IsLogin from '@/components/IsLogin'

export default function Banner() {
    return (
        <div className="md:items-baseline items-center justify-center  flex md:grid grid-cols-12 grid-rows-5  flex-col md:flex-row w-full h-[350px] md:h-[400px] bg-gradient-to-r from-white to-sky-100">
            <div className="flex flex-col col-span-5 col-start-3 row-start-3 gap-4 text-3xl font-bold md:text-5xl align-center">
                <div className="">Hi, I&apos;m Daniel 丹尼爾</div>
                <div className="flex flex-row gap-4">
                    a <div className="text-sky-500">Web Developer</div>
                </div>
                {IsLogin() && <AddArticle />}
            </div>
            <div className="hidden col-span-3 col-start-8 row-start-2 md:flex">
                <Image alt="avatar" src="/avatar_image.png" width={400} />
            </div>
            <div className="flex mt-4 md:hidden">
                <Image alt="avatar" src="/avatar_image.png" width={150} />
            </div>
        </div>
    )
}
