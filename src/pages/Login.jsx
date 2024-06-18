import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../custom.css'
import { IoMdClose } from "react-icons/io";
import { useAuth } from '../utils/AuthContext';
import ClipLoader from 'react-spinners/ClipLoader';

import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import LoadingBar from 'react-top-loading-bar';
import { FaDiscord } from 'react-icons/fa';
import { Alert } from '../components/Alert';
import packageJson from '../../package.json'
import { Modal } from '../components/Modal';


export const Login = () => {

  const appVersion = packageJson.version;


  const { loginUser, googleSignin, passRecovery } = useAuth();

  const [countryCheck, setCountryCheck] = useState(true)
  const [progress, setProgress] = useState(0);


  const fetchCountryFromIP = async () => {
    try {
      let cachedData = localStorage.getItem('userCountryData');
      if (cachedData) {
        cachedData = JSON.parse(cachedData);
        const { country, timestamp } = cachedData;
        const expirationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        if (Date.now() - timestamp < expirationTime) {
          return country === 'NP'; // Check if country is Nepal
        } else {
          localStorage.removeItem('userCountryData'); // Remove expired data from storage
        }
      }
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const country = data.country; // Get country code from API response
      cachedData = {
        country,
        timestamp: Date.now()
      };
      localStorage.setItem('userCountryData', JSON.stringify(cachedData));
      return country === 'NP'; // Check if country is Nepal
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return true; // Default to false if there's an error
    }
  };

  useEffect(() => {
    fetchCountryFromIP().then(isUserFromNepal => {
      setCountryCheck(isUserFromNepal);
    });
  }, []); // Empty dependency array to run the effect once on component mount

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  })

  const handleInputs = (event) => {
    setLoginDetails((prevData) => ({
      ...prevData,
      [event.target.name]: String(event.target.value)
    }))
  }


  const checkInputValidity = () => {
    if (loginDetails.email !== '') {
      if (loginDetails.password !== '') {
        return true;
      } else {
        toast.error("Enter your password");
      }
    } else {
      toast.error("Enter your email");
    }

  }


  const userLogin = async () => {
    if (checkInputValidity()) {
      setProgress(50)
      await loginUser(loginDetails);
      setProgress(100)

    }
  }

  const googleAuth = async (e) => {
    e.preventDefault();
    if (countryCheck !== null && countryCheck)
      await googleSignin();
  }

  const handlePasswordRecovery = async () => {
    const passRecoveryEmail = document.getElementById("passRecoveryEmail").value;
    if (passRecoveryEmail !== '' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(passRecoveryEmail)) {

      setProgress(60)
      const sendRecoveryEmail = async () => {
        try {
          await passRecovery(passRecoveryEmail);

        } catch (error) {
        }
      }
      sendRecoveryEmail();
      setProgress(100)
      setPassResetModal(false)

    } else {
      toast.error("Invalid email!")
    }

  }


  const [passResetModal, setPassResetModal] = useState(false)

  return (
    <>

      <LoadingBar color='#F88B26' progress={progress} onLoaderFinished={() => setProgress(0)} />


      <Helmet>
        <title>Login - EsportsGravity</title>
        <meta name="description" content="Login to your account on EsportsGravity." />
      </Helmet>


      <div className='h-screen w-screen bg-[url("images/gaming_bg.png")] bg-cover bg-center flex flex-col justify-center'>
        <div className='absolute z-10 h-screen w-screen bg-frameBG opacity-[90%] '>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-48 gap-28 z-20 max-h-screen overflow-auto py-8">

          <div className="col-span-1 flex md:justify-end justify-center">

            <div className={`flex flex-col items-center bg-secondary bg-opacity-[65%] max-w-[568px] lg:w-[78%] md:w-[80%] w-[90%] md:min-h-[76vh] h-auto py-6 text-offWhite rounded-[5px]`}>

              <div className='flex flex-col gap-4 items-center w-[90%]'>
                <Link to={'/'}><img src="icons/eg_square_logo.svg" alt="EG Square Logo" className='md:hidden h-14 w-14 object-cover' /></Link>

                <h2 className='font-bold text-lg mb-1'>Login With Email</h2>

                <input
                  type="email"
                  placeholder='Email Address'
                  className='w-full bg-transparent border-[0.8px] border-inactive border-opacity-30 focus:outline-none placeholder:text-sm py-2 px-4 rounded-[3px]'
                  name='email'
                  onChange={handleInputs}
                />

                <input
                  type="password"
                  placeholder='Password'
                  className='w-full bg-transparent border-[0.8px] border-inactive border-opacity-30 focus:outline-none placeholder:text-sm py-2 px-4 rounded-[3px]'
                  name='password'
                  onChange={handleInputs}
                />

                <p onClick={() => setPassResetModal(true)} className='self-end text-sm text-primary cursor-pointer'>Forgot password?</p>


                <button onClick={userLogin} disabled={progress % 100 != 0 || !countryCheck} className='bg-primary w-full text-secondary font-bold text-lg py-2 rounded-[3px] flex items-center justify-center gap-2'>Login</button>

                <div className='text-sm self-start'>Don't have an account? <Link to={'/signup'} className='text-primary underline-offset-4 underline decoration-dotted'>Sign up here</Link></div>
                <div className='flex flex-col w-full items-center mt-8'>
                  <div className="h-[0.8px] bg-inactive bg-opacity-40 w-[90%]"></div>
                  <div className='relative bg-secondary -translate-y-[50%] w-fit px-3 text-offBlue'>OR</div>

                  <button onClick={(e) => googleAuth(e)} disabled={!countryCheck} className='text-sm text-offBlue rounded-[100px] mt-2 flex justify-center items-center self-center gap-3 border-[0.5px] border-opacity-50 border-inactive h-11 md:w-[58%] w-[70%]'>
                    <img src="icons/google_icon.svg" alt="Google Icon" />
                    Continue with Google
                  </button>

                </div>

                {!countryCheck && (
                  <div className='w-full'>
                    <Alert type={"error"} message={"Your country is not yet supported. Please check back later!"} />
                  </div>
                )}

              </div>

              <p className='md:text-sm text-[11px] w-[90%] text-offBlue self-center my-6 max-sm:text-center'>By signing in, you confirm that you are at least 16 years of age and agree to our <a href='/terms-conditions' className='text-primary underline underline-offset-4'>Terms & Conditions</a> and <a href='/privacy-policy' className='text-primary underline underline-offset-4'>Privacy Policy</a></p>
              <p className='text-[12px] font-semibold text-dimText self-center z-30 mt-4 text-opacity-90 md:hidden'>v{appVersion}</p>

            </div>
          </div>

          <div className="hidden md:flex col-span-1 justify-start">
            <div className='flex flex-col items-center justify-center gap-3 text-center'>
              <Link to={'/'}><img className='mb-3' src="icons/eg_long_logo.svg" alt="EG Logo" /></Link>
              <h3 className='font-bold lg:text-4xl text-2xl'>Welcome Back!</h3>
              <p className='text-offBlue'>Play. Win. Shine</p>

              <a href="https://discord.gg/bYevaFA5tK" target='_blank'>
                <button className='text-sm mt-4 text-offBlue rounded-[100px] flex justify-center items-center self-center gap-3 border-[0.5px] border-opacity-50 border-inactive h-12 w-60'>
                  <FaDiscord className='text-xl' />
                  Join Our Discord Server
                </button>
              </a>
              <p className='text-sm text-offBlue mt-4 '>Version - {appVersion} <span className='text-primary'>(Beta)</span></p>
            </div>
          </div>
        </div>
      </div>




      <Modal outsideClose={false} closeButtonActive={false} isVisible={passResetModal} onClose={() => setPassResetModal(false)}>

        <div className='p-6 md:w-96 w-72'>
          <div className="flex flex-col gap-4 w-full">
            <input
              type="email"
              id='passRecoveryEmail'
              className='w-full bg-transparent border-[0.8px] border-inactive border-opacity-30 focus:outline-none placeholder:text-sm py-2 px-4 rounded-[3px]'
              placeholder='Your registered email'
            />
            <p>We'll send a password recovery link to your email.</p>
            <button onClick={handlePasswordRecovery} className='bg-primary rounded-[3px] text-secondary border-[1px] border-primary px-8 py-2 font-bold'>Send Link</button>
            <p onClick={() => setPassResetModal(false)} className=' text-inactive font-medium self-center cursor-pointer'>Cancel</p>
          </div>
        </div>


      </Modal>



    </>
  )
}




