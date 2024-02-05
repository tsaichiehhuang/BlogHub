import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Divider } from '@nextui-org/react'

import { useRouter } from 'next/navigation'

export default function AboutMe() {
    return (
        <Card className="max-w-[400px] gap-4 justify-center ">
            <CardHeader className="gap-4 pb-0 pt-2 px-4 flex-col items-center text-center">
                <Image alt="avatar" src="/avatar.png" width={250} isZoomed />
                <div className="  text-black text-[40px] font-bold ">丹尼爾</div>
                <div className="  text-zinc-700 text-xl font-medium ">
                    丹尼爾是一名工程師，他過往學一些人使用 GitHub Issue 來充當自己的部落格。
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="">
                <div className=" text-zinc-700 text-xl font-medium  text-center">Follow me!</div>
                <div className="gap-4">
                    <div className=" text-zinc-700 text-xl font-medium">Email</div>
                    <div className=" text-zinc-700 text-xl font-medium ">Github</div>
                </div>
            </CardBody>
            <Divider />
            <CardFooter>
                <p className="text-tiny  text-center ">關於我們 · 隱私權條款 · Cookie 條款 · © 2024 Daniel's Blog.</p>
            </CardFooter>
        </Card>
    )
}
