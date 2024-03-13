import { useContext } from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import "./MyOrders.css"
import OldOrdersTable from './OldOrdersTable';

function MyOrders() {
    const { theme } = useContext(ThemeContext)
    return (
        <div className='overflow-scroll MyOrdersContainer'>
            <Tabs className='MyOrders Tabs rounded-lg min-w-[700px] min-h-[500px] max-h-[1200px]' aria-label="Basic tabs" defaultValue={0} style={{
                backgroundColor: "transparent",
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
            }}>
                <TabList sx={{
                    backgroundColor: "var(--secondary--tabs--color)",
                    borderRadius: "8px",
                    borderBottom: "0px !important"
                }}>
                    <Tab sx={{
                        margin: "5px",
                        borderRadius: "8px",
                        transition: "400ms",
                    }} disableIndicator>Completed</Tab>
                    <Tab sx={{
                        margin: "5px",
                        borderRadius: "8px",
                        transition: "400ms",
                    }} disableIndicator>Processing</Tab>
                    <Tab sx={{
                        margin: "5px",
                        borderRadius: "8px",
                        transition: "400ms",
                    }} disableIndicator>Cancelled</Tab>
                </TabList>
                <TabPanel value={0} className='bg-transparent'>

                    <OldOrdersTable />
                </TabPanel>
                <TabPanel value={1} className='bg-transparent'>

                    <OldOrdersTable />
                </TabPanel>
                <TabPanel value={2} className='bg-transparent'>

                    <OldOrdersTable />
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default MyOrders
