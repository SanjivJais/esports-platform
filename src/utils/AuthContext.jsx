import { useContext, useState, useEffect, createContext } from "react";
import { account, ID, database, db_id } from "../../config/Appwrite";
import { useNavigate } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader'

import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const rootPath = import.meta.env.VITE_ROOT_PATH

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    checkUserStatus()
  }, [])

  useEffect(() => {
    if (user)
      userDetailsInitialization(); // Wait for userDetailsInitialization to complete
  }, [user]);


  const loginUser = async (userInfo) => {
    try {
      const response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      )
      let accountDetails = await account.get();
      setUser(accountDetails);
      navigate('/profile');
      toast.success("Login successfull", { position: "top-center" });
    } catch (error) {
      if (error.code === 401)
        toast.error("Invalid details, please check your email/password.")
      else
        toast.error(error.message);

    }
  }

  const googleSignin = async (e) => {
    try {
      account.createOAuth2Session(
        'google',
        `${rootPath}/profile`,
        `${rootPath}/login`
      );
    } catch (error) {
      toast.error(error.message);
    }
  }

  const logoutUser = () => {
    account.deleteSession('current')
    setUser(null)
    navigate('/login');
  }
  const registerUser = async (userInfo) => {
    try {
      const response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.name,
      );
      navigate('/login');
      toast.success("Account created successfully!");
    } catch (error) {
      if (error.code === 409)
        toast.error("Account already exists!")
      else
        toast.error(error.message);
    }
  }

  const checkUserStatus = async () => {
    try {
      let accoutDetails = await account.get()
      setUser(accoutDetails);

    } catch (error) {

    }
    setLoading(false)
  }

  const userDetailsInitialization = async () => {
    const userID = user.$id;
    try {
      let userDoc = await database.getDocument(
        db_id,
        'user_details',
        userID,
      )
      setUserDetails(userDoc);
    } catch (error) {
      if (error.code == '404') {  // resource not found detection
        try {
          let response = await database.createDocument(db_id, 'user_details', userID, { 'eg_token': 0 });
          setUserDetails(response);

          let notif = await database.createDocument(db_id, 'notifications', ID.unique(),
            {
              recipentType: "specific",
              message: `🎉 Welcome ${user.name}! Setup your profile to get started on EsportsGravity.`,
              recipents: [
                JSON.stringify(
                  {
                    user: user.$id,
                    read: false
                  }
                )
              ],
              targetLink: null
            }
          )

          await database.updateDocument(db_id, 'user_details', user.$id, {'notifications': [notif.$id]})
          setUserDetails((prevData)=>({
            ...prevData,
            notifications: [notif.$id]
          }))

        } catch (error) {
          console.log(error.message);
        }

      }
    }

  }

  const contextData = {
    user,
    setUser,
    userDetails,
    setUserDetails,
    loginUser,
    logoutUser,
    registerUser,
    googleSignin,
  }

  return (
    <AuthContext.Provider value={contextData} >
      {loading ? <div className="flex justify-center items-center h-[100vh] w-screen"><HashLoader color="#F88B26" /></div> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => { return useContext(AuthContext) }

export default AuthContext
