import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import Breadcrumbs from '../../components/Breadcrumbs'
import { Helmet } from 'react-helmet'
import { TbCalendarTime } from 'react-icons/tb'
import ReactHtmlParser from 'react-html-parser'
import {database, db_id} from '../../../config/Appwrite'


export const PrivacyPolicy = () => {

    const [progress, setProgress] = useState(0)

    const [page, setPage] = useState(null)
    useEffect(()=>{
        setProgress(80)
        const fetchPage = async ()=>{
            const res = await database.getDocument(db_id, 'essential_pages', 'privacy_policy');
            setPage(res)
        }
        fetchPage()
        setProgress(100)
    }, [])

    return (
        <>
            <LoadingBar color='#F88B26' progress={progress} onLoaderFinished={() => setProgress(0)} />
            <Helmet>
                <title>Privacy Policy - EsportsGravity</title>
            </Helmet>

            <div className='bg-gradient-to-r from-frameBG to-secondaryLight w-full h-52 flex flex-col items-center justify-center gap-3'>
                <div className=""><Breadcrumbs /></div>
                <h1 className='text-3xl font-bold text-offWhite flex gap-2 items-center'><span>Privacy Policy</span></h1>
                <div className="flex gap-2 items-center text-offBlue"><span className='flex items-center gap-1'><TbCalendarTime />Updated: </span><span>June 6, 2024</span></div>
            </div>


            <div className='flex flex-col px-4'>



                <div className="min-h-[420px] w-full max-w-[900px] content-area text-base text-offWhite bg-secondary self-center mt-6 items-start rounded-[5px] p-8 ">

                {page && ReactHtmlParser(page.content)}

                </div>
            </div>
        </>
    )
}
