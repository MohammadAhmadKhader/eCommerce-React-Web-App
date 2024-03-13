import { useContext } from 'react'
import ChangePasswordForm from '../../changePassword/ChangePasswordForm'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'

function ChangePasswordFromProfile() {
    const { theme } = useContext(ThemeContext)
    return (
        <div className='min-h-[500px]'>
            <div className='border-b mb-5' style={{
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
            }}>
                <h4 className='text-2xl py-2'>
                    Change Password
                </h4>
            </div>
            <ChangePasswordForm ReBuildFormClasses={`flex flex-col p-4 rounded-md max-w-xl [box-shadow:none!important;]`}  UseTitle={false} />
        </div>
    )
}

export default ChangePasswordFromProfile