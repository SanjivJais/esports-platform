import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import LoadingBar from 'react-top-loading-bar'
import Breadcrumbs from '../components/Breadcrumbs'
import { IoNotifications } from 'react-icons/io5'
import { NotificationTile } from '../components/NotificationTile'

export const Notifications = () => {

    const [progress, setProgress] = useState(0)

    const [notifications, setNotifications] = useState({
        $id: 'HOIoigs46bboi07NR',
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque dicta eveniet dolore, quos nihil esse asperiores modi cumque, quod delectus ab molestiae. Recusandae iusto voluptatibus beatae, placeat consequatur mollitia maxime.',
        $createdAt: 'June 2, 2024',
        recipents: [
            {
                userID: 'oifhi*47927Bi2Noihf',
                seen: false
            }
        ]
    })


    return (
        <>
            <LoadingBar color='#F88B26' progress={progress} onLoaderFinished={() => setProgress(0)} />
            <Helmet>
                <title>Notifications - EsportsGravity</title>
            </Helmet>

            <div className='bg-gradient-to-r from-frameBG to-secondaryLight  w-full h-44 flex flex-col items-center justify-center gap-3'>
                <div className=""><Breadcrumbs /></div>
                <h1 className='text-3xl font-bold text-offWhite flex gap-2 items-center'><IoNotifications /><span>Notifications</span></h1>
            </div>

            <div className="flex flex-col min-h-[420px] w-full max-w-[700px] px-4 bg-secondary self-center mt-6 items-start rounded-[5px]">
                <NotificationTile notification={{
                    message: 'This is a dummy notification!',
                    $createdAt: 'June 2, 2024'
                }} />
                <NotificationTile notification={{
                    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias dolores aut. Minima eaque architecto amet distinctio aut, nostrum enim! Quam accusantium nulla sit architecto, quod natus accusamus? Eos, sint.',
                    $createdAt: 'April 16, 2024'
                }} />
                <NotificationTile notification={{
                    message: 'Nostrum enim! Quam accusantium nulla sit architecto, quod natus accusamus? Eos, sint.',
                    $createdAt: 'February 4, 2024'
                }} />
                <NotificationTile notification={{
                    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias dolores aut. Minima eaque architecto amet distinctio aut, nostrum enim! Quam accusantium nulla sit architecto, quod natus accusamus? Eos, sint. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias dolores aut. Minima eaque architecto amet distinctio aut, nostrum enim! Quam accusantium nulla sit architecto, quod natus accusamus? Eos, sint.',
                    $createdAt: 'January 30, 2024'
                }} />

            </div>

        </>
    )
}
