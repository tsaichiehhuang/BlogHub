import { Card } from '@nextui-org/react'
import { Pattaya } from 'next/font/google'
import Link from 'next/link'

const pattaya = Pattaya({ weight: '400', subsets: ['latin'], display: 'swap' })
export default function Logo() {
    return (
        <Card isPressable shadow="none" isBlurred className={pattaya.className}>
            <Link href="/">Daniel&apos;s Blog </Link>
        </Card>
    )
}
