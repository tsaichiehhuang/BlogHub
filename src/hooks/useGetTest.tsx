import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const apiUrl = process.env.API_DOMAIN

function useGetTest() {
    const accessToken = Cookies.get('accessToken')

    const getTest = async () => {
        try {
            // setLoading(true)
            const response = await fetch(`https://github.com/login/oauth/authorize`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            const responseData = await response.json()
            if (response.ok) {
                // Cookies.set('liveid', responseData.data.class.stream)
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
        }
    }

    return { getTest }
}

export default useGetTest
