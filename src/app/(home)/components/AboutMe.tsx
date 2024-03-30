import { MdOutlineEmail } from 'react-icons/md'
import { BsGithub } from 'react-icons/bs'
import Image from 'next/image'

export default function AboutMe() {
    return (
        <div
            data-aos="fade-up"
            className="grid-cols-1 flex items-center md:items-start md:grid md:grid-cols-12 grid-rows-5  flex-row w-full h-[300px] md:h-[550px] "
        >
            <div className="flex-col hidden col-span-5 col-start-3 row-start-2 gap-4 text-5xl font-bold md:flex align-center">
                <Image alt="avatar" src="/avatar_photo.png" width={300} height={300} className="rounded-xl" priority />
            </div>
            <div className="flex flex-col col-span-5 col-start-6 row-start-2 gap-4 p-8 ml-4">
                <div className="text-xl font-bold md:text-3xl">About me | Daniel 丹尼爾</div>
                <p>一名工程師,他過往學一些人使用 GitHub Issue 來充當自己的部落格。</p>
                <div>
                    <ContactInfo icon={<MdOutlineEmail />} text="a0970605512@gmail.com" />
                    <ContactInfo icon={<BsGithub />} text="tsaichiehhuang" />
                </div>
            </div>
        </div>
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
