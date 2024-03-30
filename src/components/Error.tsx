import Image from 'next/image'

export default function Error(props: any) {
    const { statusCode } = props

    const ErrorMessage = () => {
        return (
            <>
                <Image alt="avatar" src="/Hands Folder Error.png" width={200} height={100} />
                {statusCode === 404 ? (
                    <div className="text-red-500 text-center font-bold mt-4 text-xl">找不到資料 </div>
                ) : statusCode === 403 ? (
                    <div className="text-red-500 text-center font-bold mt-4 text-xl">
                        請求太多次被拒絕了QQ 請等一下再來
                    </div>
                ) : (
                    <div className="text-red-500 text-center font-bold mt-4 text-xl">目前伺服器錯誤，請稍後再試</div>
                )}
            </>
        )
    }
    return (
        <div className=" flex flex-col justify-start items-center gap-4  p-4 md:pl-8 text-left mt-4 ">
            <ErrorMessage />
        </div>
    )
}
