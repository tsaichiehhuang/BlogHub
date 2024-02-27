import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react'
import LoginButton from './LoginButton'
import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'
import IsLogin from '@/components/IsLogin'
import Logo from './Logo'

export default function Header() {
    const isLogin = IsLogin()

    return (
        <>
            <Navbar>
                <NavbarContent justify="start"></NavbarContent>
                <NavbarContent justify="center"></NavbarContent>
                <NavbarContent justify="end" className="text-right">
                    <NavbarItem className=" text-right">{isLogin ? '嗨,丹尼爾' : <LoginButton />}</NavbarItem>
                </NavbarContent>
            </Navbar>

            <div className="grid grid-cols-12 grid-rows-3 col-span-12 w-full h-[204px] border-t-2 border-b-2 border-black font-['Pattaya'] text-center text-black text-[64px] ">
                {/* <div onClick={handleClick} className="row-start-2 col-span-12">
                    Daniel’s Blog
                </div> */}
                <Logo />
            </div>
        </>
    )
}
