'use client'
import React, { useState, useEffect } from 'react'
import { useDisclosure, Input, Card } from '@nextui-org/react'
import { Octokit } from '@octokit/rest'
import Cookies from 'js-cookie'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { ValidationError } from '@/types'
import CreateArticleModal from '@/app/(home)/components/CreateArticleModal'

export default function CreateArticle() {
    const token = Cookies.get('access_token')
    const octokit = new Octokit({
        auth: `${token}`,
    })
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [selectedLabels, setSelectedLabels] = useState<Array<string>>([])
    const [body, setBody] = useState('輸入內文')
    const [title, setTitle] = useState('')
    const [validationError, setValidationError] = useState<ValidationError>({ title: '', body: '' })

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleCreateIssue = async () => {
        try {
            const validationSchema = Yup.object().shape({
                title: Yup.string().required('標題為必填'),
                body: Yup.string().min(30, '內容至少要30個字').required('文章內容為必填'),
            })

            await validationSchema.validate({ title, body }, { abortEarly: false })

            const res = await octokit.request('POST /repos/{owner}/{repo}/issues', {
                owner: 'tsaichiehhuang',
                repo: 'TestBlog',
                title,
                body,
                labels: selectedLabels,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            })

            if (res.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: '文章發表成功',
                    text: '您的文章已成功發布。',
                    confirmButtonText: '確定',
                    timer: 5000,
                })
                setTimeout(() => {
                    location.reload(), 5000
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '發布文章時出錯',
                    text: '抱歉，無法完成文章的發布。請稍後再試。',
                    confirmButtonText: '確定',
                })
            }
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                const validationError = error as Yup.ValidationError

                const errors = validationError.inner.reduce((acc: any, curr: any) => {
                    acc[curr.path] = curr.message
                    return acc
                }, {})
                setValidationError(errors)
            } else {
                console.error('Error creating issue:', error)
            }
        }
    }
    useEffect(() => {
        const validateTitle = async () => {
            try {
                await Yup.string().required('標題為必填').validate(title)
                setValidationError((prevErrors: ValidationError) => ({ ...prevErrors, title: '' }))
            } catch (error: any) {
                setValidationError((prevErrors: ValidationError) => ({ ...prevErrors, title: error.message }))
            }
        }
        validateTitle()
    }, [title])

    useEffect(() => {
        const validateBody = async () => {
            try {
                await Yup.string().min(30, '內容至少要30個字').required('文章內容為必填').validate(body)
                setValidationError((prevErrors: ValidationError) => ({ ...prevErrors, body: '' }))
            } catch (error: any) {
                setValidationError((prevErrors: ValidationError) => ({ ...prevErrors, body: error.message }))
            }
        }
        validateBody()
    }, [body])

    return (
        <>
            <Card
                onClick={onOpen}
                isPressable
                shadow="sm"
                className="w-full md:w-4/5 max-h-[140px] gap-4  p-2  text-left "
            >
                <Input
                    key="outside"
                    labelPlacement="outside"
                    placeholder="Hey, Daniel！想發表什麼內容呢？"
                    className="  text-black text-[24px] font-bold"
                    size="lg"
                />
            </Card>
            <CreateArticleModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title={title}
                handleTitleChange={handleTitleChange}
                body={body}
                setBody={setBody}
                validationError={validationError}
                handleCreateIssue={handleCreateIssue}
            />
        </>
    )
}
