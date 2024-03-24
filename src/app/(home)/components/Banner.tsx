import Image from 'next/image'
import IsLogin from '@/components/IsLogin'
import dynamic from 'next/dynamic'

const CreateArticle = dynamic(() => import('@/app/(home)/components/CreateArticle'))

export default function Banner() {
    const { isAuthorLogin } = IsLogin()
    return (
        <div className="md:py-0 py-8 md:items-baseline items-center justify-around  flex md:grid grid-cols-12 grid-rows-5  flex-col md:flex-row w-full h-[800px] md:h-[500px] bg-gradient-to-r from-white to-sky-100">
            <div className="flex flex-col col-span-5 col-start-3 row-start-3 gap-8 text-3xl font-bold md:gap-4 md:text-5xl align-center">
                <div>Hi, I&apos;m Daniel 丹尼爾</div>
                <div className="flex flex-row gap-4">
                    a <div className="text-sky-500">Web Developer</div>
                </div>
                {isAuthorLogin && <CreateArticle />}
            </div>
            <div className="hidden col-span-4 col-start-8 row-span-5 row-start-2 md:flex">
                <Image alt="avatar" src="/avatar_image.png" priority width={400} height={200} />
            </div>
            <div className="flex md:hidden">
                <Image alt="avatar" src="/avatar_image.png" priority width={300} height={236} />
            </div>
        </div>
    )
}
