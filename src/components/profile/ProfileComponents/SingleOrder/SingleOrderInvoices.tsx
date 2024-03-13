import { useContext } from "react";
import { ThemeContext } from "../../../features/ThemeFeature/ThemeProvider";
import OrderCalcs from "../../../cart/cartComponents/OrderCalcs";
import { LuDownload } from "react-icons/lu";


export interface ISingleOrderInvoices {
  name: string;
  price: number;
  quantity: number;
}

const Invoices = [
  { name: "Couch", price: 34.54, quantity: 2 }, { name: "Handbag", price: 63.54, quantity: 1 }, { name: "Watch Casio", price: 134.54, quantity: 7 },
]

function SingleOrderInvoices({ name, price, quantity }: ISingleOrderInvoices) {
  const { theme } = useContext(ThemeContext)
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
        3 Item(s)
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
          {Invoices?.map((Invoice, index) => {

            return (
              <tr key={index}>
                <td className="py-1">{Invoice.name}</td>
                <td className="py-1">${Invoice.price}</td>
                <td className="py-1">{Invoice.quantity}</td>
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
        <OrderCalcs />
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