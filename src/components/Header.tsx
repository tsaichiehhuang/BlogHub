'use client'

import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react'
import LoginButton from './LoginButton'
import { useRouter } from 'next/navigation'

export default function Header() {
    return (
        <>
            <Navbar>
                <NavbarContent justify="start"></NavbarContent>
                <NavbarContent justify="center"></NavbarContent>
                <NavbarContent justify="end" className="text-right">
                    <NavbarItem className=" text-right">
                        <LoginButton />
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            <div className="grid grid-cols-12 grid-rows-3 col-span-12 w-full h-[204px] border-t-2 border-b-2 border-black font-['Pattaya'] text-center text-black text-[64px] ">
                <div className="row-start-2 col-span-12">Daniel’s Blog</div>
            </div>
        </>
    )
}
