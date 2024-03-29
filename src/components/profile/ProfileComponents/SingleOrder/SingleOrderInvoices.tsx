import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../features/ThemeFeature/ThemeProvider";
import OrderCalcs from "../../../cart/cartComponents/OrderCalcs";
import { LuDownload } from "react-icons/lu";
import { GlobalCachingContext } from "../../../features/GlobalCachingContext/GlobalCachingProvider";
import { Link, useNavigate, useParams } from "react-router-dom";
import CircularLoader from "../../../shared/CircularLoader";
import { toast } from "react-toastify";

function SingleOrderInvoices() {
  const { theme } = useContext(ThemeContext);
  const { singleOrderDetails, getInvoiceByOrderId, invoice, isInvoiceByOrderIdLoading,getSingleOrderDetails } = useContext(GlobalCachingContext);
  const [isClicked, setIsClicked] = useState(false);
  const toastId = useRef(null);
  const params = useParams()

  useEffect(()=>{
    getSingleOrderDetails(params.id);
  },[])
  useEffect(() => {
    if (invoice && invoice.pdfLink && isClicked) {
      toast.dismiss(toastId.current)
      toast.success("File is ready, Click to download");
    }
  }, [invoice,isClicked])
  useEffect(()=>{
    if(isClicked &&isInvoiceByOrderIdLoading){
      toastId.current = toast.loading("Preparing");
    }
  },[isClicked])

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
                <td className="py-1.5 text-sm font-semibold">${Number(orderItem.price)}</td>
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
          : <CircularLoader minHeight={"300px"} />}
      </div>

      {(singleOrderDetails.status == "Completed" || singleOrderDetails.status == "Processing") && <div>
        {invoice && invoice.pdfLink ? <Link className="md:ms-auto w-fit flex justify-center gap-x-3 items-center border rounded-md bg-color-accent border-color-accent 
        duration-300 text-white hover:text-color-accent hover:bg-transparent px-6 py-1.5 mt-6 text-sm font-semibold" to={invoice.pdfLink}>
          <LuDownload size={19} />
          <span>
            Download Invoice
          </span></Link> : <button className="md:ms-auto flex justify-center gap-x-3 items-center border rounded-md bg-color-accent border-color-accent 
        duration-300 text-white hover:text-color-accent hover:bg-transparent px-6 py-1.5 mt-6 text-sm font-semibold"
            onClick={async (event) => {
              setIsClicked(true);
              await getInvoiceByOrderId(singleOrderDetails._id);
            }}
          >
          <span>
            {isInvoiceByOrderIdLoading && isClicked ? "Preparing Invoice..." : "Request Invoice File"}
          </span>
        </button>}
      </div>}
    </div>
  )
}

export default SingleOrderInvoices