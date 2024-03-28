import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function ReDirectorProfile({ children }: { children: ReactNode }) {
    const location = useLocation();
    if (location.pathname == "/profile/" || location.pathname == "/profile") {
        return <Navigate to="/profile/information" />
    }

    return children
}

export default ReDirectorProfile