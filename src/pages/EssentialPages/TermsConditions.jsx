import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import Breadcrumbs from '../../components/Breadcrumbs'
import { Helmet } from 'react-helmet'
import { TbCalendarTime } from 'react-icons/tb'
import ReactHtmlParser from 'react-html-parser'
import { database, db_id } from '../../../config/Appwrite'


export const TermsConditions = () => {

    const formatDateTime = (dateTimeString) => {
        // Split the input string into date and time parts
        const [datePart, timePart] = dateTimeString.split('T');

        const [year, month, day] = datePart.split('-');
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const formattedDate = `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;

        // Parse the time part
        const [hours, minutes] = timePart.split(':');
        const hour = parseInt(hours, 10) > 12 ? parseInt(hours, 10) - 12 : parseInt(hours, 10);
        const ampm = parseInt(hours, 10) >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hour}:${minutes} ${ampm}`;

        return { date: formattedDate, time: formattedTime };
    };

    const [progress, setProgress] = useState(0)

    const [page, setPage] = useState(null)
    useEffect(() => {
        setProgress(80)
        const fetchPage = async () => {
            const res = await database.getDocument(db_id, 'essential_pages', 'terms_conditions');
            setPage(res)
        }
        fetchPage()
        setProgress(100)
    }, [])

    return (
        <>
            <LoadingBar color='#F88B26' progress={progress} onLoaderFinished={() => setProgress(0)} />
            <Helmet>
                <title>Terms and Conditions - EsportsGravity</title>
            </Helmet>

            <div className='bg-gradient-to-r from-frameBG to-secondaryLight w-full h-52 flex flex-col items-center justify-center gap-3'>
                <div className=""><Breadcrumbs /></div>
                <h1 className='text-3xl font-bold text-offWhite flex gap-2 items-center'><span>Terms and Conditions</span></h1>
            </div>


            <div className='flex flex-col px-4'>



                <div className="min-h-[420px] w-full max-w-[900px] content-area text-[17px] text-offBlue bg-secondary self-center mt-6 items-start rounded-lg p-8 ">
                    <div className="flex gap-2 items-center text-offBlue mb-6"><span className='flex items-center gap-1'><TbCalendarTime />Last updated: </span><span className='italic'>{page && formatDateTime(page.$updatedAt).date}</span></div>


                    {page && ReactHtmlParser(page.content)}

                </div>
            </div>
        </>
    )
}
