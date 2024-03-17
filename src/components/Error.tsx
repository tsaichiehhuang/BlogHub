import { Image } from '@nextui-org/react'

export default function Error(props: any) {
    const { statusCode } = props

    const ErrorMessage = () => {
        if (statusCode === 404) {
            ;<>
                <Image alt="avatar" src="/Hands Folder Error.png" width={200} />
                <div className="text-red-500 text-center font-bold mt-4 text-xl">找不到資料 </div>
            </>
        } else if (statusCode === 403) {
            return (
                <>
                    <Image alt="avatar" src="/Hands Folder Error.png" width={200} />
                    <div className="text-red-500 text-center font-bold mt-4 text-xl">
                        請求太多次被拒絕了QQ 請等一下再來
                    </div>
                </>
            )
        }
    }
    return (
        <div className=" flex flex-col justify-start items-center gap-4  p-4 md:pl-8 text-left mt-4 ">
            <ErrorMessage />
        </div>
    )
}
