'use client'

import React, { useState, useEffect, useContext } from 'react'
import ArticleDisplayLayout from './ArticleDisplayLayout'

export default function ArticleDisplay() {
    const [issues, setIssues] = useState([])
    useEffect(() => {
        const owner = 'tsaichiehhuang'
        const repo = 'tsaichiehhuang'

        const fetchIssues = async () => {
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
                console.error('Error fetching issues:', error)
            }
        }

        fetchIssues()
    }, [])
    return issues.map((issue: any, index: number) => <ArticleDisplayLayout issue={issue} key={index} />)
}
