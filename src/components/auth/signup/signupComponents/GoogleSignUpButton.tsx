import { GoogleLogin as GoogleSignUp,GoogleLoginResponse} from "@leecheuk/react-google-login"
import GoogleButton from '../../sharedAuth/GoogleButton'
import useAxios from "../../../../customHooks/useAxios"
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { UserContext } from "../../../features/UserFeature/UserProvider";
import { useNavigate } from "react-router-dom";
import GoogleClientApi from "../../sharedAuth/GoogleClientApi";

function onFailure(err : any){
    console.log(err)
}
function GoogleSignUpButton() {
    const {POST} = useAxios();
    const [isDisabled,setIsDisabled] = useState<boolean>(false);
    const {setUserData,setUserToken} = useContext(UserContext);
    const navigate = useNavigate()

    async function onSuccess(Props : GoogleLoginResponse){
        await signUpUsingGoogle(Props.tokenId);
    }

    async function signUpUsingGoogle(tokenId:string){
        try{
            const {data} = await POST("/users/oauth/google/signup",{},tokenId);

            if(data["message"] === "success"){
                setUserData(data.user);
                setUserToken(data.token);
                toast.success("You have Signed up successfully!");
                navigate("/");
            }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong please try again later")
        }
    }
    const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID
  return (
    <GoogleClientApi>
        <GoogleSignUp
            render={(renderProps)=>{
                return (
                    <GoogleButton
                    onClick={async()=>{
                        setIsDisabled(true);
                        renderProps.onClick();
                    }}
                    text={"Sign up with Google"}
                    isDisabled={renderProps.disabled || isDisabled}
                    />
                )
            }}
            clientId={clientId}
            onSuccess={onSuccess}
            onFailure={onFailure}
        />
    </GoogleClientApi>
  )
}

export default GoogleSignUpButton