import React, { createContext, useEffect, useState } from 'react'
import { User } from '../../../types/types';
import useAxios from '../../customHooks/useAxios';
export interface UserContext {
    userToken:string | null;
    setUserToken:React.Dispatch<React.SetStateAction<string | null>>;
    userData:null | User;
    setUserData:React.Dispatch<React.SetStateAction<User | null>>
    isUserFetchDataLoading:boolean
}

export const UserContext = createContext<UserContext>(null)

function UserProvider({children}) {
    const [userToken,setUserToken] = useState<string | null>(null)
    const [userData,setUserData] = useState(null);
    const [isUserFetchDataLoading,setIsUserFetchDataLoading] = useState(true)
    const {GET} = useAxios()

    const getUserDate = async()=>{
      const {data} = await GET("/users",localStorage.getItem("userTokenGeekOut"))
      setUserData(data.user);
      console.log(data)
      setIsUserFetchDataLoading(false)
    }

    const getUserTokenAndData = ()=>{
      const userTokenGeekOut = localStorage.getItem("userTokenGeekOut")
      if(userTokenGeekOut){
          setUserToken(userTokenGeekOut);
          getUserDate();
      }else{
        setIsUserFetchDataLoading(false)
      }

  }
  useEffect(()=>{
    getUserTokenAndData()
  },[])
  
  
    return (
    <UserContext.Provider value={{ userToken,setUserToken,userData,setUserData,isUserFetchDataLoading }}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider