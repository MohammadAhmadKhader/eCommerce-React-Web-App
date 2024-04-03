import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../features/UserFeature/UserProvider'

function Auth({children} : {children : ReactNode}) {
    const {userToken} = useContext(UserContext)
    if(userToken != null){
        console.log(userToken)
        return <Navigate to="/"/>
    }


    return children
}

export default Auth