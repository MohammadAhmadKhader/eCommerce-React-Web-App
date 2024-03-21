import { useContext, useEffect } from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { ThemeContext } from '../../../features/ThemeFeature/ThemeProvider';
import SingleOrderDetails from './SingleOrderDetails';
import SingleOrderInvoices from './SingleOrderInvoices';
import OrderCalcs from '../../../cart/cartComponents/OrderCalcs';
import { GlobalCachingContext } from '../../../features/GlobalCachingContext/GlobalCachingProvider';
import { Link, useParams } from 'react-router-dom';


function SingleOrderSection() {
  const { theme } = useContext(ThemeContext);
  const { orders, singleOrderDetails, setSingleOrderDetails, getSingleOrderDetails } = useContext(GlobalCachingContext);
  const params = useParams()
  useEffect(() => {
    if (orders) {
      const wantedOrder = orders.find((item) => {
        return item._id === params.id
      })

      if (wantedOrder) {
        setSingleOrderDetails(wantedOrder)
      } else {
        getSingleOrderDetails(params.id)
      }

    }
  }, [])

  useEffect(() => {
    console.log(singleOrderDetails)
  }, [singleOrderDetails])
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
                  {singleOrderDetails ? <OrderCalcs deliveryFee={singleOrderDetails.deliveryFee} discount={singleOrderDetails.discount}
                    grandTotal={singleOrderDetails.grandTotal} subTotal={singleOrderDetails.subTotal} /> : <div>loading</div>}
                </div>
              </div>

              <div>
                <h5 className='mt-5 opacity-70 font-semibold' style={{
                  color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                }}>Payment Details</h5>
                <div>
                  <h6 className='text-sm font-semibold'>{singleOrderDetails?.paymentDetails}</h6>
                </div>
              </div>

              <div>
                <h5 className='mt-5 opacity-70 font-semibold' style={{
                  color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                }}>Address Details</h5>
                <div>
                  <p className='tracking-wider font-semibold'>{singleOrderDetails?.address?.country || "Palestine"}</p>
                  <p className='tracking-wider font-semibold'>{singleOrderDetails?.address?.state}</p>
                  <p className='tracking-wider font-semibold'>{singleOrderDetails?.address?.city}</p>
                  <p className='tracking-wider font-semibold'>{singleOrderDetails?.address?.streetAddress}</p>
                </div>
              </div>

            </div>

            <div className='text-left lg:text-right'>
              
                <Link to={`/checkout/${singleOrderDetails?._id}`} className='bg-color-accent duration-300 border border-color-accent
               text-white hover:bg-transparent hover:text-color-accent px-8 py-1.5 rounded-md text-sm font-semibold tracking-wide'>
                  Complete Checkout
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