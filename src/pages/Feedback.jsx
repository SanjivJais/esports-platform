import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import LoadingBar from 'react-top-loading-bar'
import Breadcrumbs from '../components/Breadcrumbs'
import { MdFeedback } from 'react-icons/md'

export const Feedback = () => {
    const [progress, setProgress] = useState(0)
    return (
        <>
            <LoadingBar color='#F88B26' progress={progress} onLoaderFinished={() => setProgress(0)} />

            <Helmet>
                <title>Feedback - EsportsGravity</title>
                <meta name="description" content="Help us improve the platform with your valuable feedback" />
            </Helmet>

            <div className="py-3 pl-4"><Breadcrumbs /></div>

            <div className="px-4 py-2">
                <h1 className='flex items-center gap-2 text-2xl text-offWhite font-bold'><MdFeedback /><span>Feedback</span></h1>
                <p className='text-offBlue'>Help us improve the platform with your valuable feedback.</p>
            </div>

        </>
    )
}
