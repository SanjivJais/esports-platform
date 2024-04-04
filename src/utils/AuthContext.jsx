import { useContext, useState, useEffect, createContext } from "react";
import { account, ID } from "../../config/Appwrite";
import { useNavigate } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    checkUserStatus()
  }, [])

  const loginUser = async (userInfo) => {
    setLoading(true)
    try {
      const response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      )
      let accountDetails = await account.get();
      setUser(accountDetails);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  }

  const logoutUser = () => {
    account.deleteSession('current')
    setUser(null)
  }
  const registerUser = async (userInfo) => {
    setLoading(true)
    try {
      const response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.name
      );
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  const checkUserStatus = async () => {
    try {
      let accoutDetails = await account.get()
      setUser(accoutDetails);
    } catch (error) {

    }
    setLoading(false)
  }

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
  }

  return (
    <AuthContext.Provider value={contextData} >
      {loading ? <div className="flex justify-center items-center h-[100vh] w-screen"><HashLoader color="#F88B26" /></div> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => { return useContext(AuthContext) }

export default AuthContext
