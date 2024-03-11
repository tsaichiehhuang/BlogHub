import Header from '@/components/Header'

export default async function Layout({ children }: { children: any }) {
    return (
        <main className="flex w-full justify-center items-center flex-col">
            <Header />
            <div className=" flex flex-col w-full justify-center items-center">{children}</div>
        </main>
    )
}
