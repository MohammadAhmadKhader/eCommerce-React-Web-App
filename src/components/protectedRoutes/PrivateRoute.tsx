import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../features/UserFeature/UserProvider'

function PrivateRoute({children} : {children : ReactNode}) {
    const {userToken,userData,isUserFetchDataLoading} = useContext(UserContext)
    if(userToken == null || userData == null && !isUserFetchDataLoading){
        return <Navigate to="/"/>
    }


    return children
}

export default PrivateRoute