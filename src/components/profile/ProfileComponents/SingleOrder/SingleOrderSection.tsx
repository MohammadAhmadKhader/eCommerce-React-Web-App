import { useContext } from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { ThemeContext } from '../../../features/ThemeFeature/ThemeProvider';
import SingleOrderDetails from './SingleOrderDetails';
import SingleOrderInvoices from './SingleOrderInvoices';
import OrderCalcs from '../../../cart/cartComponents/OrderCalcs';
import { Link } from 'react-router-dom';


function SingleOrderSection() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className='overflow-scroll MyOrdersContainer'>
      <Tabs className='MyOrders Tabs rounded-lg min-w-[600px] min-h-[500px] max-h-[1200px]' aria-label="Basic tabs" defaultValue={0} style={{
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
          }} disableIndicator>Items Ordered</Tab>
          <Tab sx={{
            margin: "5px",
            borderRadius: "8px",
            transition: "400ms",
          }} disableIndicator>Invoices</Tab>
        </TabList>
        <TabPanel value={0} className='bg-transparent min-w-[800px]'>
          <SingleOrderDetails />
          <div className='w-full mt-8'>
            <h4 className='font-semibold text-2xl border-b py-2'
              style={{ borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)" }}>

              Order Information
            </h4>

            <div className='flex justify-between gap-x-9'>
              <div>
                <h5 className='mt-5 opacity-70 font-semibold' style={{
                  color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                }}>Order Details</h5>
                <div className='min-w-72'>
                  <OrderCalcs />
                </div>
              </div>

              <div>
                <h5 className='mt-5 opacity-70 font-semibold' style={{
                  color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                }}>Payment Details</h5>
                <div>
                  <h6>Cash on Delivery</h6>
                </div>
              </div>

              <div>
                <h5 className='mt-5 opacity-70 font-semibold' style={{
                  color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                }}>Address Details</h5>
                <div>
                  <p>Palestine</p>
                  <p>WestBank</p>
                  <p>Nablus</p>
                  <p>Falasten street</p>
                </div>
              </div>

            </div>
            <div className='lg:text-right my-8'>
              <Link to="" className='bg-color-accent text-white rounded-md px-6 py-1.5 duration-300
               border-color-accent border hover:bg-white hover:text-color-accent text-sm font-semibold'>
                Add Rating
              </Link>
            </div>
          </div>

        </TabPanel>
        <TabPanel value={1} className='bg-transparent'>

          <SingleOrderInvoices />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default SingleOrderSection