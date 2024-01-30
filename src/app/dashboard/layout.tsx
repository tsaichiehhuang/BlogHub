import { Navbar, Link } from '@nextui-org/react'
// import DropdownWrapper from '@/components/DropdownWrapper';
// import Path from '@/components/Path';
import Image from 'next/image'
import { cookies } from 'next/headers'
import { Octokit } from 'octokit'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const issueOctokit = new Octokit({
        auth: cookies().get('access_token')?.value,
    })
    await issueOctokit.request('GET /issues', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    })

    return (
        <>
            <Navbar
                isBordered
                height="4.0rem"
                className="border-[#303031] bg-[#050506] bg-opacity-80 backdrop-blur-md backdrop-filter"
                classNames={{
                    base: 'justify-between',
                    wrapper: 'max-w-full sm:px-10',
                }}
            >
                <Link href="/" className="hover:opacity-100">
                    <Image width={32} height={32} alt="logo" src="/images/logo.png" unoptimized />
                </Link>
            </Navbar>
            <div className="w-full overflow-y-auto scrollbar-hide">{children}</div>
        </>
    )
}
