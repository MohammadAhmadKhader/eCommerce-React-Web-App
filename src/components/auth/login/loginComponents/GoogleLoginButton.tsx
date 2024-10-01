import { GoogleLogin, GoogleLoginResponse } from "@leecheuk/react-google-login"
import useAxios from "../../../../customHooks/useAxios";
import { useContext, useState } from "react";
import { UserContext } from "../../../features/UserFeature/UserProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GoogleClientApi from "../../sharedAuth/GoogleClientApi";
import GoogleButton from "../../sharedAuth/GoogleButton";

function onFailure(err) {
    console.log(err)
}

function GoogleLoginButton() {
    const { GET } = useAxios();
    const navigate = useNavigate();
    const { setUserToken, setUserData } = useContext(UserContext);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID;

    async function onSuccess(response:GoogleLoginResponse) {
        if(!isDisabled){
            await verifyAccessToken(response.tokenId as string);
        }
    }

    async function verifyAccessToken(tokenId :string) {
        try{
            const { data } = await GET("/users/oauth/google/signin", tokenId);
            if (data.message === "success" && data["token"] && data["user"]) {
                setUserData(data.user);
                setUserToken(data.token);
                toast.success("You have sign in successfully!");
                localStorage.setItem("userTokenGoStore", data.token)
                navigate("/")
            }
            if (data["message"] && data.message === "User not found. Please sign up to create a new account.") {
                toast.warning("We don't have you on our database please sign up first!");
                return;
            }
        }catch(error){
            toast.error("Something went wrong please try again later!");
        }
    }
    return (
        <GoogleClientApi>
            <GoogleLogin
                render={(renderProps) => {
                    return (
                        <GoogleButton isDisabled={renderProps.disabled || isDisabled} 
                        text={"Continue with Google"}
                        onClick={() => {
                            renderProps.onClick();
                            setIsDisabled(true);
                        }} />
                    )
                }}
                clientId={clientId}
                onFailure={onFailure}
                onSuccess={onSuccess}
            />

        </GoogleClientApi>
    )
}

export default GoogleLoginButton