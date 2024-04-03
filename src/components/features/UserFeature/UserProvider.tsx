import React, { createContext, useEffect, useState } from 'react'
import { User } from '../../../types/types';
import useAxios from '../../customHooks/useAxios';
export interface UserContext {
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
  userData: null | User;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>
  isUserFetchDataLoading: boolean;
  getUserData: () => Promise<void>;
}

export const UserContext = createContext<UserContext>(null)

function UserProvider({ children }) {

  const [userToken, setUserToken] = useState<string | null>(localStorage.getItem("userTokenGeekOut") || null)
  const [userData, setUserData] = useState(null);
  const [isUserFetchDataLoading, setIsUserFetchDataLoading] = useState(true)
  const { GET } = useAxios()

  const getUserData = async () => {
    try {
      if (userToken) {
        const { data } = await GET("/users", userToken)
        setUserData(data.user);
      }
    } catch (error) {
      console.log(error);
      setUserToken(null);
      localStorage.removeItem("userTokenGeekOut")
    } finally {
      setIsUserFetchDataLoading(false)
    }
  }
  useEffect(() => {
    getUserData()
  }, [])


  return (
    <UserContext.Provider value={{ userToken, setUserToken, userData, setUserData, isUserFetchDataLoading, getUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider