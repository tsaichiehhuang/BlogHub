import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Divider } from '@nextui-org/react'
import { MdOutlineEmail } from 'react-icons/md'
import { BsGithub } from 'react-icons/bs'
import { useRouter } from 'next/navigation'

export default function AboutMe() {
    return (
        <Card className="md:w-full gap-4 justify-center p-4 md:p-6">
            <CardHeader className="hidden md:flex gap-4 pb-0 pt-2 px-4 md:flex-col items-center text-center">
                <div className="hidden md:flex">
                    <Image alt="avatar" src="/avatar.png" width={200} />
                </div>
                <div className="  text-black text-[24px] font-bold ">丹尼爾</div>
                <div className="  text-zinc-700 text-md font-medium ">
                    丹尼爾是一名工程師，他過往學一些人使用 GitHub Issue 來充當自己的部落格。
                </div>
            </CardHeader>

            <CardBody className="text-zinc-700 text-sm md:text-xl gap-4 font-medium  text-center flex-row justify-center items-center">
                <div className="md:hidden">
                    <Image alt="avatar" src="/avatar.png" width={160} />
                    <div className="mt-1 text-black  md:text-[40px] font-bold ">丹尼爾</div>
                </div>
                <div className="justify-start items-start flex-col  text-left	">
                    <div className="mb-1 md:hidden">
                        丹尼爾是一名工程師，他過往學一些人使用 GitHub Issue 來充當自己的部落格。
                    </div>
                    <div className="text-xs flex-row flex items-center gap-2">
                        <MdOutlineEmail />
                        a0970605512@gmail.com
                    </div>
                    <div className="text-xs flex-row flex items-center gap-2">
                        <BsGithub />
                        tsaichiehhuang
                    </div>
                    <div className="md:hidden mt-1 text-xs text-zinc-300"> &copy; 2024 Daniel&apos;s Blog.</div>
                </div>
            </CardBody>

            <CardFooter className="hidden md:block text-tiny  text-center justify-center">
                <p className="text-xs  "> &copy; 2024 Daniel&apos;s Blog.</p>
            </CardFooter>
        </Card>
    )
}
