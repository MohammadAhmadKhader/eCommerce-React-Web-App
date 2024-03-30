import { MdLogout } from 'react-icons/md'
import { ILogoutButton } from '../../../types/types'
import { useContext } from 'react'
import { UserContext } from '../../features/UserFeature/UserProvider'
import { useNavigate } from 'react-router-dom'
import useAxios from '../../customHooks/useAxios'

function LogoutButton({customClasses,isHidden = true,isCentered = false,size = 22,rebuildClasses=false} : ILogoutButton) {
  const navigate = useNavigate()
  const { setUserData,setUserToken,userData} = useContext(UserContext)
  const {DELETE} = useAxios()

  const logout = async(userId)=>{
    await DELETE("/users/logout",{
      userId,
    })
  }
  return (
    <button className={`${rebuildClasses ? ``:` items-center ${ isCentered ? "justify-center" :"justify-between"} font-semibold border border-color-accent
         px-4 rounded-md py-1 duration-300 hover:text-white hover:bg-color-accent ${ isHidden ? "hidden" :""}  md:flex`} ${customClasses}`}
          onClick={()=>{
              setUserData(null);
              setUserToken(null);
              localStorage.removeItem("userTokenGeekOut")
              logout(userData._id)
              navigate("/")
            }} 
         >
          <span>
            <MdLogout size={size}/>
          </span>
          <span>
            Logout
          </span>
    </button>
  )
}

export default LogoutButton