'use client'
import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react'
import LoginButton from './LoginButton'
import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'

export default function Logo() {
    const router = useRouter()
    const handleClick = () => {
        router.push(`/`)
    }
    return (
        <div onClick={handleClick} className="row-start-2 col-span-12 cursor-pointer">
            Daniel’s Blog
        </div>
    )
}
