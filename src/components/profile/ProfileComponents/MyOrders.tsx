import { useContext, useEffect, useState } from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import "./MyOrders.css"
import OldOrdersTable from './OldOrdersTable';
import { useSearchParams } from 'react-router-dom';
import useAxios from '../../customHooks/useAxios';
import { UserContext } from '../../features/UserFeature/UserProvider';
import { GlobalCachingContext } from '../../features/GlobalCachingContext/GlobalCachingProvider';

function MyOrders() {
    const { theme } = useContext(ThemeContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const { GET } = useAxios(true, 600000) // reCache every 10 mins
    const { userData, userToken } = useContext(UserContext);
    const {orders,setOrders} = useContext(GlobalCachingContext)

    const getOrders = async (status: string) => {
        try {
            if (userData) {
                const { data } = await GET(`/orders/${userData._id}?status=${status}`, userToken);
                console.log(data.orders)
                setOrders(data.orders)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const ensureCorrectValueOfStatus = () => {
        if (!searchParams.get("status")) {
            searchParams.set("status", "Completed");
            setSearchParams(searchParams)
        }
        if (searchParams.get("status") &&
            searchParams.get("status") != "Completed" &&
            searchParams.get("status") != "Processing" &&
            searchParams.get("status") != "Cancelled") {
            searchParams.set("status", "Completed");
            setSearchParams(searchParams)
        }
    }

    useEffect(() => {
        ensureCorrectValueOfStatus();
    }, [])

    useEffect(() => {
        ensureCorrectValueOfStatus();
        getOrders(searchParams.get("status"));
    }, [searchParams])


    return (
        <div className='overflow-scroll MyOrdersContainer'>
            <Tabs className='MyOrders Tabs rounded-lg min-w-[700px] min-h-[500px] max-h-[1200px]' aria-label="Basic tabs" defaultValue={searchParams.get("status") || "Completed"}
                onChange={(event, newValue) => {
                    searchParams.set("status", `${newValue}`);
                    setSearchParams(searchParams);
                }}
                style={{
                    backgroundColor: "transparent",
                    color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                }}>
                <TabList sx={{
                    backgroundColor: "var(--secondary--tabs--color)",
                    borderRadius: "8px",
                    borderBottom: "0px !important"
                }}>
                    <Tab value='Completed'
                        sx={{
                            margin: "5px",
                            borderRadius: "8px",
                            transition: "400ms",
                        }} disableIndicator>Completed</Tab>
                    <Tab value='Processing'
                        sx={{
                            margin: "5px",
                            borderRadius: "8px",
                            transition: "400ms",
                        }} disableIndicator>Processing</Tab>
                    <Tab value='Cancelled'
                        sx={{
                            margin: "5px",
                            borderRadius: "8px",
                            transition: "400ms",
                        }} disableIndicator>Cancelled</Tab>
                </TabList>
                <TabPanel value={"Completed"} className='bg-transparent'>

                    <OldOrdersTable orders={orders} />
                </TabPanel>
                <TabPanel value={"Processing"} className='bg-transparent'>

                    <OldOrdersTable orders={orders} />
                </TabPanel>
                <TabPanel value={"Cancelled"} className='bg-transparent'>

                    <OldOrdersTable orders={orders} />
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default MyOrders
