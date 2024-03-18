import { cookies } from 'next/headers'

export default function IsLogin() {
    let isAuthorLogin = false
    let isUserLogin = false
    const access_token = cookies().get('access_token')
    const username = cookies().get('username')
    const authorName = 'tsaichiehhuang'
    if (access_token && username.value === authorName) {
        //有登入、本人
        isAuthorLogin = true
    } else if (access_token && username.value !== authorName) {
        //有登入、非本人
        isUserLogin = true
    } else {
        //未登入
        isAuthorLogin = false
        isUserLogin = false
    }

    return { isAuthorLogin, isUserLogin }
}
