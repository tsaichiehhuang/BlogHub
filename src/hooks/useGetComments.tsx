import React, { useState, useEffect } from 'react'

function useGetComments() {
    const [comments, setComments] = useState([])

    const getComments = async (commentsUrl: string) => {
        console.log('commentsUrl:', commentsUrl)
        try {
            const response = await fetch(commentsUrl)
            if (!response.ok) {
                throw new Error('Failed to fetch comments')
            }
            const data = await response.json()
            setComments(data)
        } catch (error) {
            console.error('Error fetching comments:', error)
        }
    }

    return { comments, getComments }
}

export default useGetComments
