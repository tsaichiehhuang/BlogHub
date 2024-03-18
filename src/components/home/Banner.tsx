import { Image } from '@nextui-org/react'
import AddArticle from '@/components/home/CreateArticle'
import IsLogin from '@/components/IsLogin'

export default function Banner() {
    return (
        <div className="md:py-0 py-8 md:items-baseline items-center justify-around  flex md:grid grid-cols-12 grid-rows-5  flex-col md:flex-row w-full h-[800px] md:h-[500px] bg-gradient-to-r from-white to-sky-100">
            <div
                data-aos="zoom-in"
                className="flex flex-col col-span-5 col-start-3 row-start-3 gap-8 text-3xl font-bold md:gap-4 md:text-5xl align-center"
            >
                <div>Hi, I&apos;m Daniel 丹尼爾</div>
                <div className="flex flex-row gap-4">
                    a <div className="text-sky-500">Web Developer</div>
                </div>
                {IsLogin() && <AddArticle />}
            </div>
            <div className="hidden col-span-4 col-start-8 row-span-5 row-start-2 md:flex">
                <Image alt="avatar" src="/avatar_image.png" width={400} />
            </div>

            <Image className="flex md:hidden" alt="avatar" src="/avatar_image.png" width={300} />
        </div>
    )
}
