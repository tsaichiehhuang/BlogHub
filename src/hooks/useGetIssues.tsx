import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'

function useGetIssues() {
    const accessToken = Cookies.get('accessToken')
    const [issues, setIssues] = useState([])
    const owner = 'tsaichiehhuang'
    const repo = 'tsaichiehhuang'
    const getIssues = async () => {
        try {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
                headers: {
                    Accept: 'application/json',
                },
                method: 'GET',
            })
            if (!response.ok) {
                throw new Error('Failed to fetch issues')
            }

            setIssues(await response.json())
        } catch (error) {
            console.error('Error fetching class data:', error)
        }
    }
    return { getIssues, issues }
}

export default useGetIssues
