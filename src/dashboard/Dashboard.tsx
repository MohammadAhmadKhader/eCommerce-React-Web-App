import { useContext } from 'react'
import DashboardSidebar from './DashboardSidebar'
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from '../components/features/UserFeature/UserProvider';

function Dashboard() {
    const {userData,userToken} = useContext(UserContext);
    const navigate = useNavigate();
    if(!userData || !userToken || userData.role !== "admin"){
        navigate("/");
    }
    
    return (
        <section className='flex -mt-2 md:mt-0'>
            <div className='w-[42px] md:w-[230px] flex-shrink-0'>
                <DashboardSidebar />
            </div>
            <div className='w-[calc(100%-42px)] md:w-[calc(100%-230px)]'>
                <Outlet />
            </div>
        </section>
    )
}

export default Dashboard