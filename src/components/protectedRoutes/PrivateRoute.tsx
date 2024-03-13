import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../features/UserFeature/UserProvider'

function PrivateRoute({children} : {children : ReactNode}) {
    const {userToken} = useContext(UserContext)
    if(userToken == null){
        return <Navigate to="/"/>
    }


    return children
}

export default PrivateRoute