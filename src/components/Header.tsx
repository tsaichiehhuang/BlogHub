import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react'
import LoginButton from './LoginButton'
import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'
import IsLogin from '@/components/IsLogin'
import Logo from './Logo'
import LogoutButton from '@/components/LogoutButton'

export default function Header() {
    const isLogin = IsLogin()

    return (
        <>
            <Navbar maxWidth="full">
                <NavbarContent justify="end">
                    <NavbarItem className="text-right">
                        {isLogin ? (
                            <div className="flex-row flex items-center">
                                <div className="font-bold text-lg">嗨,丹尼爾</div> <LogoutButton />
                            </div>
                        ) : (
                            <LoginButton />
                        )}
                    </NavbarItem>
                    {/* {isLogin && <NavbarItem className=" text-right"></NavbarItem>} */}
                </NavbarContent>
            </Navbar>

            <div className="grid grid-cols-12 grid-rows-3 col-span-12 w-full h-[204px] border-t-2 border-b-2 border-black font-['Pattaya'] text-center text-black text-[64px] ">
                <Logo />
            </div>
        </>
    )
}
