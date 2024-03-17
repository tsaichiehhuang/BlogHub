import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react'
import LoginButton from './header/LoginButton'
import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'

export default function IsLogin() {
    let isLogin = false
    if (cookies().get('access_token')) {
        isLogin = true
    } else {
        isLogin = false
    }

    return isLogin
}
