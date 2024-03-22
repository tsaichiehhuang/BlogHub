'use client'
import { Card } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { Pattaya } from 'next/font/google'
const pattaya = Pattaya({ weight: '400', subsets: ['latin'], display: 'swap' })
export default function Logo() {
    const router = useRouter()
    const handleClick = () => {
        router.push(`/`)
    }
    return (
        <Card isPressable shadow="none" isBlurred onClick={handleClick} className={pattaya.className}>
            Daniel&apos;s Blog
        </Card>
    )
}
