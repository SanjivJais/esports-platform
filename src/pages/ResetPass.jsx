import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import { account } from '../../config/Appwrite'


export const ResetPass = () => {

    const [progress, setProgress] = useState(0)


    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');


    const [newPasswords, setNewPasswords] = useState({
        password: '',
        confirm_password: '',
    })

    const handlePasswordInput = (e) => {
        e.preventDefault();
        setNewPasswords((prevData) => ({
            ...prevData,
            [e.target.name]: String(e.target.value)
        }))
    }

    const [passUpdateStatus, setPassUpdateStatus] = useState(false)


    const passValidity = () => {
        if (newPasswords.password !== '') {
            if (newPasswords.password.length >= 8) {
                if (newPasswords.password === newPasswords.confirm_password) {
                    return true
                } else {
                    toast.error("Confirmed password does not match!");
                }
            } else {
                toast.error("Password must contain at least 8 characters!")
            }
        } else {
            toast.error("Enter a new password!")
        }
        return false;
    }

    const handlePassRecovery = async () => {

        if (passValidity() && userId && secret) {
            setProgress(60)
            try {
                await account.updateRecovery(
                    userId,
                    secret,
                    newPasswords.password,
                    newPasswords.confirm_password,
                );

                setPassUpdateStatus(true)
            } catch (error) {
                toast.error(error.message)
            }
            setProgress(100)

        }

    }



    return (
        <>

            <LoadingBar color='#F88B26' progress={progress} onLoaderFinished={() => setProgress(0)} />


            <div className='h-screen w-screen bg-[url("images/gaming_bg.jpg")] bg-cover bg-center flex flex-col items-center'>
                <div className='absolute z-10 h-screen w-screen bg-frameBG md:opacity-[96%] opacity-[93%]'>
                </div>
                
                <div className="relative top-[20%] z-20 flex flex-col justify-center items-center gap-3">
                    <img src="icons/eg_square_logo.svg" alt="EG logo" className='mb-2 h-14 w-14 object-cover' />

                    {secret && userId ? <>

                        {!passUpdateStatus ?
                            <>
                                <h2 className='text-lg text-offWhite'>Recover Password</h2>
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="password"
                                        placeholder='New Password (min. 8 chars)'
                                        className='w-full bg-transparent border-[0.8px] border-inactive border-opacity-30 focus:outline-none placeholder:text-sm py-2 px-4 rounded-[3px]'
                                        name='password'
                                        onChange={handlePasswordInput}
                                    />
                                    <input
                                        type="password"
                                        placeholder='Confirm New Password'
                                        className='w-full bg-transparent border-[0.8px] border-inactive border-opacity-30 focus:outline-none placeholder:text-sm py-2 px-4 rounded-[3px]'
                                        name='confirm_password'
                                        onChange={handlePasswordInput}
                                    />

                                    <button onClick={handlePassRecovery} disabled={progress % 100 != 0} className='bg-primary w-full text-secondary font-semibold py-2 rounded-[3px] flex items-center justify-center gap-2'>Reset Password</button>
                                </div>
                            </>
                            :
                            <>
                                <h2 className='text-lg font-semibold text-openStatus'>Password reset successfull!</h2>
                                <Link to={'/login'} className='text-primary'>‹ Login</Link>

                            </>
                        }

                    </> :
                        <>
                            <h2 className='text-lg font-bold text-red-600'>Invalid verification link</h2>

                        </>
                    }

                    {!passUpdateStatus && <Link to={'/'} className='text-primary'>‹ Go to Home</Link>}
                </div>
            </div>

        </>
    )
}
