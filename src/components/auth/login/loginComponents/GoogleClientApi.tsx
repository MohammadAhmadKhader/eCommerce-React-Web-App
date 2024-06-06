import { useEffect } from 'react'
import { gapi } from "gapi-script";

function GoogleClientApi({ children }) {
    useEffect(() => {
        function start() {
            const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID;
            gapi.client.init({
                clientId,
                scope: "openid"
            })
        }
        gapi.load("client:auth2",start)
    }, [])

    return (
        <>{children}</>
    )
}

export default GoogleClientApi