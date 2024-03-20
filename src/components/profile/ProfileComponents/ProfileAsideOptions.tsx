
import { useContext } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import ProfileNavLinkComponents from './ProfileNavLinkComponents'
import { IProfileAsideOptions } from '../../../types/types';

function ProfileAsideOptions({ CustomComponent }: IProfileAsideOptions) {
    const { theme } = useContext(ThemeContext)
    return (
        <aside className='flex-col rounded-md p-3 md:bg-color-secondaryTabs h-full ' style={{
            color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
        }}>
            <ProfileNavLinkComponents title={"Personal Information"} href={"/profile/information"} />
            <ProfileNavLinkComponents title={"Change password"} href={"/profile/changepassword"} />
            <ProfileNavLinkComponents title={"My Orders"} href={"/profile/orders?status=Completed"} />
            <ProfileNavLinkComponents title={"My Wishlist"} href={"/profile/wishlist"} />
            <ProfileNavLinkComponents title={"My Reviews"} href={"/profile/reviews"} />

            <div className={`${CustomComponent ? "my-2" : ""}`}>
                {CustomComponent && <CustomComponent isHidden={false} isCentered={true}
                    customClasses='flex w-full justify-center py-2 gap-x-2' />}
            </div>
        </aside>
    )
}

export default ProfileAsideOptions