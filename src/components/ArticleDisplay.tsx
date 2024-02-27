'use client'

import React, { useState, useEffect, useContext } from 'react'
import ArticleDisplayLayout from './ArticleDisplayLayout'
import useGetIssues from '@/hooks/useGetIssues'

export default function ArticleDisplay() {
    const { getIssues, issues } = useGetIssues()

    useEffect(() => {
        getIssues()
    }, [])

    return issues.map((issue: any, index: number) => <ArticleDisplayLayout issue={issue} key={index} />)
}
