import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'

function useGetIssues() {
    const [issues, setIssues] = useState([])
    const perPage = 10
    const [hasMoreIssues, setHasMoreIssues] = useState(true)
    const owner = 'tsaichiehhuang'
    const repo = 'TestBlog'
    const getIssues = async (page: number) => {
        try {
            const response = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/issues?page=${page}&per_page=${perPage}`,
                {
                    headers: {
                        Accept: 'application/json',
                    },
                    method: 'GET',
                }
            )
            if (!response.ok) {
                throw new Error('Failed to fetch issues')
            }

            const newIssues = await response.json()

            setIssues((prevIssues) => [...prevIssues, ...newIssues])
            if (newIssues.length < perPage) {
                setHasMoreIssues(false)
            }
        } catch (error) {
            console.error('Error fetching class data:', error)
        }
    }

    return { getIssues, issues, hasMoreIssues }
}

export default useGetIssues
