import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import LoadingBar from 'react-top-loading-bar'
import Breadcrumbs from '../components/Breadcrumbs'
import { IoNotifications } from 'react-icons/io5'
import { NotificationTile } from '../components/NotificationTile'
import { database, db_id } from '../../config/Appwrite'
import { Query } from 'appwrite'
import { useAuth } from '../utils/AuthContext'

export const Notifications = () => {
    const { user } = useAuth()
    const [progress, setProgress] = useState(0)

    const [notifications, setNotifications] = useState(null)


    useEffect(() => {
        setProgress(50)

        const fetchNotifications = async () => {
            const nots = await database.listDocuments(db_id, 'notifications', [Query.limit(40), Query.orderDesc('$createdAt')])
            setNotifications(nots.documents.filter((notification) => {
                if (notification.recipentType === "all") {
                    return true;
                } else if (notification.recipentType === "specific") {
                    return notification.recipents.some((recipient) => JSON.parse(recipient).user === user.$id);
                }
                return false;
            }))
        }
        fetchNotifications()
        setProgress(100)

    }, [])



    return (
        <>
            <LoadingBar color='#F88B26' progress={progress} onLoaderFinished={() => setProgress(0)} />
            <Helmet>
                <title>Notifications - EsportsGravity</title>
            </Helmet>

            <div className='bg-gradient-to-r from-frameBG to-secondaryLight  w-full h-52 flex flex-col items-center justify-center gap-3'>
                <div className=""><Breadcrumbs /></div>
                <h1 className='text-3xl font-bold text-offWhite flex gap-2 items-center'><IoNotifications /><span>Notifications</span></h1>
            </div>


            <div className='flex flex-col px-4'>

                <div className="min-h-[420px] w-full max-w-[700px] px-4 bg-secondary self-center mt-6 items-start rounded-[5px]">
                    {notifications && notifications.map((notification, index) => (
                        <NotificationTile key={index} notification={notification} />
                    ))}

                </div>
            </div>


        </>
    )
}
