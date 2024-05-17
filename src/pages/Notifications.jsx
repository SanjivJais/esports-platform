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
    const { user, userDetails } = useAuth()
    const [progress, setProgress] = useState(0)

    const [notifications, setNotifications] = useState(null)



    useEffect(() => {
        setProgress(60)

        const fetchNotifications = async () => {
            const nots = await database.listDocuments(db_id, 'notifications', [Query.limit(25), Query.orderDesc('$createdAt'), Query.equal('recipentType', 'all')])
            setNotifications(nots.documents)

            if (userDetails && userDetails.notifications.length > 0) {
                const userNots = await database.listDocuments(db_id, 'notifications', [Query.contains('$id', userDetails.notifications), Query.limit(25)])
                setNotifications((prevNots) => {
                    const existingIds = new Set(prevNots.map(not => not.$id));
                    const newNotifications = userNots.documents.filter(not => !existingIds.has(not.$id));
                    const allNotifications = [...prevNots, ...newNotifications]
                    allNotifications.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
                    return allNotifications;
                });
            }

        }
        fetchNotifications()
        setProgress(100)

    }, [userDetails])





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
