'use client'
import React, { useState, useEffect, useContext } from 'react'
import useGetIssues from '@/hooks/useGetIssues'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Textarea,
    Input,
} from '@nextui-org/react'
import Cookies from 'js-cookie'
import * as Yup from 'yup'

export default function EditArticle(props) {
    const { issue, number } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const token = Cookies.get('access_token')
    const [body, setBody] = useState(issue.body)
    const [title, setTitle] = useState(issue.title)
    const [validationError, setValidationError] = useState(null)

    const handleClick = () => {
        onOpen()
        setBody(issue.body)
        setTitle(issue.title)
    }
    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleEditIssue = async () => {
        const validationSchema = Yup.object().shape({
            title: Yup.string().required('標題為必填'),
            body: Yup.string().min(30, '內容至少要30個字').required('文章內容為必填'),
        })

        await validationSchema.validate({ title, body }, { abortEarly: false })
        const owner = 'tsaichiehhuang'
        const repo = 'TestBlog'
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}`, {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${token}`,
            },
            method: 'PATCH',
            body: JSON.stringify({ title: title, body: body }),
        })
        if (res.status === 200) {
            setTimeout(() => {
                location.reload()
            }, 1000)
        }
    }
    useEffect(() => {
        const validateTitle = async () => {
            try {
                await Yup.string().required('標題為必填').validate(title)
                setValidationError((prevErrors) => ({ ...prevErrors, title: '' }))
            } catch (error) {
                setValidationError((prevErrors) => ({ ...prevErrors, title: error.message }))
            }
        }
        validateTitle()
    }, [title])

    useEffect(() => {
        const validateBody = async () => {
            try {
                await Yup.string().min(30, '內容至少要30個字').required('文章內容為必填').validate(body)
                setValidationError((prevErrors) => ({ ...prevErrors, body: '' }))
            } catch (error) {
                setValidationError((prevErrors) => ({ ...prevErrors, body: error.message }))
            }
        }
        validateBody()
    }, [body])
    return (
        <>
            <Button className="hidden md:block" color="primary" onClick={handleClick}>
                <div>編輯文章</div>
            </Button>
            <div className="md:hidden block" onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                    <path
                        d="M4.243 16.6957H0V12.4465L11.435 0.994814C11.6225 0.807068 11.8768 0.701599 12.142 0.701599C12.4072 0.701599 12.6615 0.807068 12.849 0.994814L15.678 3.82695C15.771 3.91996 15.8447 4.03041 15.8951 4.15198C15.9454 4.27356 15.9713 4.40388 15.9713 4.53549C15.9713 4.66709 15.9454 4.79741 15.8951 4.91899C15.8447 5.04056 15.771 5.15101 15.678 5.24402L4.243 16.6957ZM0 18.6987H18V20.7016H0V18.6987Z"
                        fill="black"
                    />
                </svg>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">編輯文章</ModalHeader>
                            <ModalBody>
                                <Input
                                    key="outside"
                                    type="email"
                                    label="標題"
                                    labelPlacement="outside"
                                    placeholder={issue && issue.title}
                                    value={title}
                                    onChange={handleTitleChange}
                                    errorMessage={validationError ? validationError.title : ' '}
                                />
                                <Textarea
                                    label="文章內容"
                                    labelPlacement="outside"
                                    placeholder={issue && issue.body}
                                    value={body}
                                    onChange={handleBodyChange}
                                    errorMessage={validationError ? validationError.body : ' '}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={handleEditIssue}>
                                    確定新增
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
