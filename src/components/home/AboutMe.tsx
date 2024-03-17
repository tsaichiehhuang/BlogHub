import { MdOutlineEmail } from 'react-icons/md'
import { BsGithub } from 'react-icons/bs'
import { Card, CardHeader, CardBody, CardFooter, Image } from '@nextui-org/react'

export default function AboutMe() {
    return (
        <div className="grid-cols-1 flex md:grid md:grid-cols-12 grid-rows-5  flex-row w-full h-[200px] md:h-[500px] ">
            <div className="flex-col hidden col-span-5 col-start-3 row-start-2 gap-4 text-5xl font-bold md:flex align-center">
                <Image alt="avatar" src="/avatar_photo.png" width={300} />
            </div>
            <div className="flex flex-col col-span-5 col-start-6 row-start-2 gap-4 p-8 ml-4">
                <div className="text-xl font-bold md:text-3xl">About me | Daniel 丹尼爾</div>
                <div>一名工程師,他過往學一些人使用 GitHub Issue 來充當自己的部落格。</div>
                <div>
                    <ContactInfo icon={<MdOutlineEmail />} text="a0970605512@gmail.com" />
                    <ContactInfo icon={<BsGithub />} text="tsaichiehhuang" />
                </div>
            </div>
        </div>
        // <Card className="justify-center gap-4 p-4 mb-4 md:w-full md:p-6">
        //     <CardHeader className="items-center hidden gap-4 px-4 pt-2 pb-0 text-center md:flex md:flex-col">
        //         <div className="hidden md:flex">
        //             <Image alt="avatar" src="/avatar.png" width={200} />
        //         </div>
        //         <div className="  text-black text-[24px] font-bold ">丹尼爾</div>

        //         <AboutText />
        //     </CardHeader>

        //     <CardBody className="flex-row items-center justify-center gap-4 text-sm font-medium text-center text-zinc-700 md:text-xl">
        //         <div className="md:hidden">
        //             <Image alt="avatar" src="/avatar.png" width={160} />
        //             <div className="mt-1 text-black  md:text-[40px] font-bold ">丹尼爾</div>
        //         </div>
        //         <div className="flex-col items-start justify-start text-left ">
        //             <div className="md:hidden">
        //                 <AboutText />
        //             </div>

        //             <ContactInfo icon={<MdOutlineEmail />} text="a0970605512@gmail.com" />
        //             <ContactInfo icon={<BsGithub />} text="tsaichiehhuang" />
        //             <div className="mt-1 text-xs md:hidden text-zinc-300"> &copy; 2024 Daniel&apos;s Blog.</div>
        //         </div>
        //     </CardBody>

        //     <CardFooter className="justify-center hidden text-center md:block text-tiny">
        //         <p className="text-xs "> &copy; 2024 Daniel&apos;s Blog.</p>
        //     </CardFooter>
        // </Card>
    )
}
function ContactInfo({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="flex flex-row items-center gap-2 text-xs">
            {icon}
            {text}
        </div>
    )
}
function AboutText() {
    return (
        <div className="mb-1 font-medium text-zinc-700 text-md">
            丹尼爾是一名工程師，他過往學一些人使用 GitHub Issue 來充當自己的部落格。
        </div>
    )
}
