import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../custom.css'
import { useAuth } from '../utils/AuthContext';
import { Alert } from '../components/Alert';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'
import { Helmet } from 'react-helmet';
import { FaDiscord } from 'react-icons/fa';
import packageJson from '../../package.json'



export const Signup = () => {

  const appVersion = packageJson.version;

  const [progress, setProgress] = useState(0);
  const [countryCheck, setCountryCheck] = useState(true)

  const [signupFormOpen, setSignupFormOpen] = useState(false)

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

  const { registerUser, googleSignin } = useAuth();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleInputs = (event) => {
    event.preventDefault();
    setUserData((prevData) => ({
      ...prevData,
      [event.target.name]: String(event.target.value),
    }))
  }


  const checkInputValidity = () => {
    if (userData.name !== '') {
      if (userData.email !== '' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email)) {
        if (userData.password !== '') {
          if (userData.password.length >= 8) {
            if (userData.password === userData.confirm_password) {
              return true;
            } else {
              toast.error("Confirmed password does not match!")
            }

          } else {
            toast.error("Password must be at least 8 characters!");
          }
        } else {
          toast.error("Create a password");
        }
      } else {
        toast.error("Invalid email");
      }
    } else {
      toast.error("Enter your name");
    }
  }

  const signUp = async () => {
    if (countryCheck !== null && countryCheck && checkInputValidity()) {
      setProgress(50)
      await registerUser(userData);
      setProgress(100)
    }
  };

  const googleAuth = async (e) => {
    e.preventDefault();
    if (countryCheck !== null && countryCheck) {
      await googleSignin();

    }
  }


  return (
    <>
      <LoadingBar color='#F88B26' progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Helmet>
        <title>Signup - EsportsGravity</title>
        <meta name="description" content="Create an account to get started on EsportsGravity." />
      </Helmet>


      <div className='h-screen w-screen bg-[url("images/gaming_bg.png")] bg-cover bg-center flex flex-col justify-center'>
        <div className='absolute z-10 h-screen w-screen bg-frameBG opacity-[90%] '>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-48 gap-28 z-20 max-h-screen overflow-auto py-8">

          <div className="col-span-1 flex md:justify-end justify-center">

            <div className={`flex flex-col items-center ${signupFormOpen ? '' : 'justify-evenly'}  bg-secondary bg-opacity-[65%] max-w-[568px] lg:w-[78%] md:w-[80%] w-[90%] md:min-h-[76vh] h-auto py-6 text-offWhite rounded-[5px]`}>

              {
                !signupFormOpen ?
                  <>
                    <div className='flex flex-col gap-4 items-center w-full'>
                      <Link to={'/'}><img src="icons/eg_square_logo.svg" alt="EG Square Logo" className='md:hidden h-14 w-14 object-cover' /></Link>

                      <h2 className='font-bold md:text-[22px] text-lg mb-1'>Sign Up</h2>

                      <button onClick={(e) => googleAuth(e)} disabled={!countryCheck} className='text-sm text-offBlue rounded-[100px] flex justify-center items-center self-center gap-3 border-[0.5px] border-opacity-50 border-inactive h-12 md:w-[58%] w-[70%]'>
                        <img src="icons/google_icon.svg" alt="Google Icon" />
                        Continue with Google
                      </button>

                      <button onClick={() => setSignupFormOpen(true)} disabled={!countryCheck} className='text-sm text-offBlue rounded-[100px] flex justify-center items-center self-center gap-3 border-[0.5px] border-opacity-50 border-inactive h-12 md:w-[58%] w-[70%]'>
                        <img src="icons/email_icon.svg" alt="Email Icon" />
                        Signup with Email
                      </button>

                      <p className='text-sm text-offBlue'>Already have an account? <Link to={'/login'} className='text-primary underline decoration-dotted'>Login here</Link></p>

                      {!countryCheck && (
                        <div className='w-[90%]'>
                          <Alert type={"error"} message={"Your country is not yet supported. Please check back later!"} />
                        </div>
                      )}


                    </div>
                  </>
                  :
                  <>
                    <div className='flex flex-col gap-4 items-center w-[90%]'>
                      <Link to={'/'}><img src="icons/eg_square_logo.svg" alt="EG Square Logo" className='md:hidden h-14 w-14 object-cover' /></Link>

                      <h2 className='font-bold text-lg mb-1'>Sign Up With Email</h2>

                      <input
                        type="text"
                        placeholder='Your Name'
                        className='w-full bg-transparent border-[0.8px] border-inactive border-opacity-30 focus:outline-none placeholder:text-sm py-2 px-4 rounded-[3px]'
                        name='name'
                        onChange={handleInputs}
                      />
                      <input
                        type="email"
                        placeholder='Email Address'
                        className='w-full bg-transparent border-[0.8px] border-inactive border-opacity-30 focus:outline-none placeholder:text-sm py-2 px-4 rounded-[3px]'
                        name='email'
                        onChange={handleInputs}
                      />

                      <input
                        type="password"
                        placeholder='Create Password'
                        className='w-full bg-transparent border-[0.8px] border-inactive border-opacity-30 focus:outline-none placeholder:text-sm py-2 px-4 rounded-[3px]'
                        name='password'
                        onChange={handleInputs}
                      />

                      <input
                        type="password"
                        placeholder='Confirm Password'
                        className='w-full bg-transparent border-[0.8px] border-inactive border-opacity-30 focus:outline-none placeholder:text-sm py-2 px-4 rounded-[3px]'
                        name='confirm_password'
                        onChange={handleInputs}
                      />


                      <button onClick={signUp} disabled={progress % 100 != 0 || !countryCheck} className='bg-primary w-full text-secondary font-bold text-lg py-2 rounded-[3px] flex items-center justify-center gap-2'>Sign Up</button>

                      <div className='text-sm self-start'>Already have an account? <Link to={'/login'} className='text-primary underline-offset-4 underline decoration-dotted'>Login here</Link></div>
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
                  </>
              }

              <p className='md:text-sm text-[11px] w-[90%] text-offBlue self-center my-6 max-sm:text-center'>By signing up, you confirm that you are at least 16 years of age and agree to our <a href='/terms-conditions' className='text-primary underline underline-offset-4'>Terms & Conditions</a> and <a href='/privacy-policy' className='text-primary underline underline-offset-4'>Privacy Policy</a></p>
              <p className='text-[12px] font-semibold text-dimText self-center z-30 mt-4 text-opacity-90 md:hidden'>v{appVersion}</p>

            </div>
          </div>

          <div className="hidden md:flex col-span-1 justify-start">
            <div className='flex flex-col items-center justify-center gap-3 text-center'>
              <Link to={'/'}><img className='mb-3' src="icons/eg_long_logo.svg" alt="EG Logo" /></Link>
              <h3 className='font-bold lg:text-4xl text-2xl'>Create <span className='text-primary'>Account</span> Now!</h3>
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


    </>
  )
}




