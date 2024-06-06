import { GoogleLogin } from "@leecheuk/react-google-login"
import { FcGoogle } from "react-icons/fc";
import useAxios from "../../../../customHooks/useAxios";
import { useContext, useState } from "react";
import { UserContext } from "../../../features/UserFeature/UserProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GoogleClientApi from "./GoogleClientApi";

function onFailure(err) {
    console.log(err)
}

function GoogleLoginButton() {
    const { GET } = useAxios();
    const navigate = useNavigate();
    const { setUserToken, setUserData } = useContext(UserContext);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID;

    async function onSuccess(response) {
        if(!isDisabled){
            await verifyAccessToken(response.tokenId as string);
        }
    }

    async function verifyAccessToken(tokenId) {
        const { data } = await GET("/users/oauth/google/signin", tokenId);
        if (data.message === "success" && data["token"] && data["user"]) {
            setUserData(data.user);
            setUserToken(data.token);
            toast.success("You have sign in successfully!");
            localStorage.setItem("userTokenGeekOut", data.token)
            navigate("/")
        }
        if (data["message"] && data.message === "User not found. Please sign up to create a new account.") {
            toast.warning("We don't have you on our database please sign up first!");
            return;
        }
        if (data["error"]) {
            toast.error("Something went wrong please try again later!");
        }
    }
    return (
        <GoogleClientApi>
            <GoogleLogin
                render={(renderProps) => {

                    return (
                        <button
                            type="button"
                            className={`group w-full rounded-3xl border-color-accent border duration-300 hover:bg-color-accent
                            disabled:hover:bg-transparent disabled:opacity-65`}
                            onClick={() => {
                                renderProps.onClick();
                                setIsDisabled(true);
                            }}
                            disabled={renderProps.disabled || isDisabled}>
                            <span className='flex items-center py-1.5 mx-auto w-fit gap-x-2'>
                                <div className="group-disabled:group-hover:bg-transparent group-hover:bg-white rounded-full duration-300">
                                    <FcGoogle size={25} />
                                </div>
                                <span className='group-disabled:group-hover:text-inherit font-semibold group-hover:text-white'>Continue with google</span>
                            </span>
                        </button>
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