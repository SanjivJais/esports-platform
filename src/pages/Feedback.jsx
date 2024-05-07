import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import LoadingBar from 'react-top-loading-bar'
import Breadcrumbs from '../components/Breadcrumbs'
import { MdFeedback } from 'react-icons/md'
import { useAuth } from '../utils/AuthContext'
import { ID, database, db_id } from '../../config/Appwrite'
import { toast } from 'react-toastify'

export const Feedback = () => {
    const { user } = useAuth()
    const [progress, setProgress] = useState(0)

    const [feedback, setFeedback] = useState({
        'name': `${user ? user.name : ""}`,
        'email': `${user ? user.email : ""}`,
        'subject': "",
        'message': ""
    })

    const handleInput = (e) => {
        e.preventDefault()
        setFeedback((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const checkFormStatus = () => {
        if (feedback.name !== "") {
            if (feedback.email !== "") {
                if (feedback.subject !== "") {
                    if (feedback.message !== "") {
                        return true
                    } else {
                        toast.error("Please put your feedback in message box")
                    }
                } else {
                    toast.error("Enter a subject")
                }
            } else {
                toast.error("Fill up your email")
            }
        } else {
            toast.error("Fill up your name")
        }
        return false
    }

    const handleFeedback = async () => {
        if (checkFormStatus()) {
            setProgress(50)
            try {
                await database.createDocument(db_id, 'feedback', ID.unique(), feedback)
                toast.success("We've received your feedback, thank you!")
                setFeedback((prevData) => ({
                    ...prevData,
                    'subject': "",
                    'message': ""
                }))
            } catch (error) {
                toast.error(error.message)
            }
            setProgress(100)
        }
    }


    return (
        <>
            <LoadingBar color='#F88B26' progress={progress} onLoaderFinished={() => setProgress(0)} />

            <Helmet>
                <title>Feedback - EsportsGravity</title>
                <meta name="description" content="Help us improve the platform with your valuable feedback" />
            </Helmet>

            <div className='bg-gradient-to-r from-frameBG to-secondaryLight w-full h-60 flex flex-col items-center justify-center gap-3 mb-6'>
                <div className=""><Breadcrumbs /></div>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className='text-3xl font-bold text-offWhite flex gap-2 items-center'><MdFeedback /><span>Feedback</span></h1>
                    <p className='text-offBlue'>Help us improve the platform with your valuable feedback.</p>
                </div>
            </div>

            <div className='flex flex-col gap-2 w-full max-w-[600px] self-center p-4 pt-2'>

                {!user && <>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name <span className='text-red-600'>*</span></label>
                        <input onChange={(e) => handleInput(e)} value={feedback.name} id='name' name='name' type="text" placeholder='Name' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email <span className='text-red-600'>*</span></label>
                        <input onChange={(e) => handleInput(e)} value={feedback.email} id='email' name='email' type="email" placeholder='Email' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                    </div>
                </>
                }
                <div className="flex flex-col gap-2">
                    <label htmlFor="subject">Subject <span className='text-red-600'>*</span></label>
                    <input onChange={(e) => handleInput(e)} value={feedback.subject} id='subject' name='subject' type="text" placeholder='Subject' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="message">Message <span className='text-red-600'>*</span></label>
                    <textarea onChange={(e) => handleInput(e)} value={feedback.message} id='message' name='message' rows={10} placeholder='Your message here!' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                </div>

                <button onClick={handleFeedback} className='bg-primary text-secondary font-bold text-lg rounded-[5px] py-2'>Submit</button>

            </div>



        </>
    )
}
