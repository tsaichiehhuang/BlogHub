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
        <div onClick={handleClick} className="cursor-pointer  font-Pattaya">
            Daniel&apos;s Blog
        </div>
    )
}
