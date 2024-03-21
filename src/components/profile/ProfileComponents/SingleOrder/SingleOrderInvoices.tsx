import { useContext} from "react";
import { ThemeContext } from "../../../features/ThemeFeature/ThemeProvider";
import OrderCalcs from "../../../cart/cartComponents/OrderCalcs";
import { LuDownload } from "react-icons/lu";
import { GlobalCachingContext } from "../../../features/GlobalCachingContext/GlobalCachingProvider";


function SingleOrderInvoices() {
  const { theme } = useContext(ThemeContext);
  const { singleOrderDetails,getSingleOrderDetails } = useContext(GlobalCachingContext);
  console.log(singleOrderDetails)
  // const params = useParams()
  // console.log(params)
  // useEffect(()=>{
  //   getSingleOrderDetails(params.orderId)
  // },[])
  return (
    <div>
      <div>
        <div className='border-b my-2' style={{
          borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
        }}>
          <h4 className='text-xl py-2'>
            Invoices
          </h4>
        </div>
      </div>
      <div className="text-gray-400 font-semibold my-4">
        {singleOrderDetails?.orderItems?.length} Item(s)
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b" style={{
            borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
          }}>
            <th className="py-1 font-semibold">Product</th>
            <th className="py-1 font-semibold">Price</th>
            <th className="py-1 font-semibold">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {singleOrderDetails.orderItems?.map((orderItem, index) => {

            return (
              <tr key={orderItem._id + index}>
                <td className="py-1.5 text-sm font-semibold">{orderItem.name}</td>
                <td className="py-1.5 text-sm font-semibold">${Number(orderItem.subTotal)}</td>
                <td className="py-1.5 text-sm font-semibold">{orderItem.quantity}</td>
              </tr>
            )
          })}

        </tbody>
      </table>

      <div className="mt-4">
        <div className='border-b my-2' style={{
          borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
        }}>
          <h5 className='text-md font-semibold py-2'>
            Price Details
          </h5>
        </div>

        {singleOrderDetails?.deliveryFee != undefined ?
          <OrderCalcs deliveryFee={singleOrderDetails?.deliveryFee} grandTotal={singleOrderDetails?.grandTotal}
            subTotal={singleOrderDetails?.subTotal} discount={singleOrderDetails?.discount} />
        : <div>loading</div>}
      </div>

      <div >
        <button className="md:ms-auto flex justify-center gap-x-3 items-center border rounded-md bg-color-accent border-color-accent 
        duration-300 text-white hover:text-color-accent hover:bg-transparent px-6 py-1.5 mt-6 text-sm font-semibold">
          <LuDownload size={19} />
          <span>
            Download Invoice
          </span>
        </button>
      </div>
    </div>
  )
}

export default SingleOrderInvoices