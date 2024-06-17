import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-dom';
import { FaUserCheck } from 'react-icons/fa';

export const AccountVerification = () => {

    const { user, verifyUser } = useAuth();

    useEffect(() => {
        const confirmUserVerification = async () => {
            await verifyUser();
        }
        confirmUserVerification();
    }, [])


    return (
        <>
            <Helmet>
                <title>Verify Account - EsportsGravity</title>
            </Helmet>

            <div className='h-screen w-screen flex flex-col items-center'>
                <div className="relative top-[30%] flex flex-col justify-center items-center gap-3">
                    <img src="icons/eg_square_logo.svg" alt="EG logo" className='mb-2 h-14 w-14 object-cover' />
                    {user.emailVerification ?
                        <>
                            <div className="flex items-center gap-3">
                                <FaUserCheck className='text-openStatus text-4xl' />
                                <h2 className='text-4xl font-bold text-openStatus'>Account Verified</h2>
                            </div>
                        </>
                        :
                        <h2 className='text-4xl font-bold text-inactive'>Account is Unverified</h2>
                    }
                    <Link to={'/'} className='text-primary'>‹ Go to Home</Link>
                </div>
            </div>
        </>
    )
}
