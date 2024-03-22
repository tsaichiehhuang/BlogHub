import LoginButton from '@/components/header/LoginButton'

export default function LoginPage() {
    return (
        <div className="flex min-h-screen">
            <div className="w-full bg-white ">
                <h1 className="pt-36 text-center text-4xl font-bold leading-tight text-black">Log in</h1>
                <div className="flex flex-col items-center gap-10">
                    <LoginButton />
                </div>
            </div>
        </div>
    )
}
