import { useContext, useEffect, useState } from 'react'
import DashboardSidebar from './DashboardSidebar'
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from '../components/features/UserFeature/UserProvider';
import { IoMenu } from "react-icons/io5";
import { useTheme, useMediaQuery } from '@mui/material';
import ResponsiveSidebar from './ResponsiveSidebar';
import DashboardTitle from './DashboardTitle';

function Dashboard() {
    const { userData, userToken } = useContext(UserContext);
    const navigate = useNavigate();
    if (!userData || !userToken || userData.role !== "admin") {
        navigate("/");
    }

    const [isResponsiveSidebarOpen, setIsResponsiveSidebarOpen] = useState<boolean>(false);
    const MuiTheme = useTheme();
    const isSmallScreen = useMediaQuery(MuiTheme.breakpoints.down('md'));
    useEffect(() => {
        if (!isSmallScreen) {
            setIsResponsiveSidebarOpen(false)
        }
    }, [isSmallScreen])


    return (
        <section className='flex md:mt-0'>
            <ResponsiveSidebar isOpen={isResponsiveSidebarOpen} setIsOpen={setIsResponsiveSidebarOpen}
                drawerSide='left' slideStyles={{ marginTop: "5px" }}>
                <div className='ms-1 mt-1 mb-3'>
                    <DashboardTitle />
                </div>
                <DashboardSidebar removeDefaultStyles={true} className='min-h-fit' />
            </ResponsiveSidebar>

            <div className='hidden md:w-[230px] md:block flex-shrink-0'>
                <DashboardSidebar className='h-full' />
            </div>

            <div className='w-full md:w-[calc(100%-230px)]'>
                <div className='ms-1 mt-1 md:ms-4 flex items-center'>
                    <IoMenu size={38} className='cursor-pointer my-auto me-1 mt-0.5 duration-500 hover:text-color-accent md:hidden'
                        onClick={() => setIsResponsiveSidebarOpen(true)} />
                    <DashboardTitle />
                </div>
                <Outlet />
            </div>
        </section>
    )
}

export default Dashboard