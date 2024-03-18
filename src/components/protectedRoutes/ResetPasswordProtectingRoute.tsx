import { ReactNode, useEffect, } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import useAxios from '../customHooks/useAxios'


function ResetPasswordProtectingRoute({ children }: { children: ReactNode }) {
  const params = useParams()
  const navigate = useNavigate()
  const { GET } = useAxios()
  const verifyResetPasswordToken = async (token: string) => {
    try {
      console.log(token)
      const { data } = await GET(`/users/verifyResetPasswordToken/${token}`)
      if (!data["message"]) {
        navigate("/");
        console.log("first")
      }
      console.log(data)
    } catch (error) {
      navigate("/")
      console.log(error)
    }
  }

  useEffect(() => {
    if (params.token && params.token.length == 64) {
      verifyResetPasswordToken(params.token)
    }
  }, [])
  console.log(params)
  if (!params.token || params.token.length != 64) {
    return <Navigate to="/" />
  }

  return children
}

export default ResetPasswordProtectingRoute




