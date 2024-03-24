import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import IsLogin from '@/components/IsLogin'
import Logo from './Logo'
import dynamic from 'next/dynamic'
const LoginButton = dynamic(() => import('@/components/header/LoginButton'))
const LogoutButton = dynamic(() => import('@/components/header/LogoutButton'))

export default function Header() {
    const { isAuthorLogin, isUserLogin } = IsLogin()

    return (
        <Navbar maxWidth="full">
            <NavbarBrand>
                <Logo />
            </NavbarBrand>

            <NavbarContent justify="end">
                <NavbarItem className="text-right">
                    {isAuthorLogin || isUserLogin ? (
                        <div className="flex flex-row items-center">
                            <div className="font-bold text-md">嗨,丹尼爾</div> <LogoutButton />
                        </div>
                    ) : (
                        <LoginButton />
                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}
