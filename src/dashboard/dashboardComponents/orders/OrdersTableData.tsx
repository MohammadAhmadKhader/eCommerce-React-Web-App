import React, { useContext, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { FaChevronUp } from 'react-icons/fa6';
import { getCorrectDate } from '../dashboardShared/helperFunctions';
import DeleteButton from '../dashboardShared/DeleteButton';
import useAxios from '../../../customHooks/useAxios';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import { toast } from 'react-toastify';
import TableDataMenu from '../dashboardShared/TableDataMenu';

export interface IInvoiceTableData {
    order: any;
    index: number;
    itemsNumber:number;
}

function OrdersTableData({ order, index,itemsNumber }: IInvoiceTableData) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isCancellingOrder,setIsCancellingOrder] = useState<boolean>(false);
    const {PATCH} = useAxios();
    const {userToken} = useContext(UserContext);

    const cancelOrderByAdminPrivilege = async (order:any,userToken:string)=>{
        try {
            if(confirm(`Are you sure you want to cancel order with Id : ${order?._id}`)){
                setIsCancellingOrder(true);
                const {data} = await PATCH(`/orders/dashboard/${order?._id}`,{},userToken);

                if(data.message==="success"){
                    toast.success(`Order with Id : ${order?._id} was cancelled`);
                }
            }
        } catch (error) {
            toast.error(error)
            console.log(error)
        } finally{
            setIsCancellingOrder(false)
        }
    }
    const menuList = [{
        onClick: () => {
            cancelOrderByAdminPrivilege(order,userToken)
        },
        text: "Cancel Order",
    }
    ]
    const [isContextMenuOpen, setIsContextMenuOpen] = useState<null | HTMLElement>(null);
    const [xMenuPosition, setXMenuPosition] = useState<number>(0);
    const [yMenuPosition, setYMenuPosition] = useState<number>(0);
    return (
        <React.Fragment>
            <TableDataMenu x={xMenuPosition} y={yMenuPosition} menuList={menuList} header={{ fieldName: "ID", fieldValue: `#${order?._id}` }}
                isContextMenuOpen={isContextMenuOpen} setIsContextMenuOpen={setIsContextMenuOpen} />
            <tr key={order?._id}
            onContextMenu={(e) => {
                e.preventDefault()
                setXMenuPosition(e.clientX)
                setYMenuPosition(e.clientY)

                setIsContextMenuOpen(e.currentTarget);
            }}
            >
                <td style={{ textAlign: "center" }}>
                    <button className='rounded-md flex justify-center items-center bg-color-accent duration-300 hover:bg-sky-800 p-1 text-white'
                        onClick={() => setIsOpen((prevState) => !prevState)}
                    >
                        <FaChevronUp size={12} className={`duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                </td>
                <td className='text-center text-[15px] tracking-wide font-semibold'>#{itemsNumber + index + 1}</td>
                <td className='text-center text-[13px] tracking-wide font-semibold'>#{order?._id}</td>
                <td className='text-[15px] tracking-wide font-semibold text-center'>
                    {order?.subTotal}$
                </td>
                <td className='text-[15px] tracking-wide font-semibold text-center'>
                    {order?.grandTotal}$
                </td>
                <td className={`text-[14px] tracking-wider font-semibold text-center ${order?.status === "Completed" ? `text-green-600` : (order?.status === "Cancelled" ? "text-red-600" : (order?.status === "Processing" ? "text-blue-600" : ""))}`}>
                    {order?.status}
                </td>
                <td className='text-[14px] tracking-wider font-semibold text-center'>
                    {getCorrectDate(order?.createdAt)}
                </td>
                <td className='text-[14px] tracking-wide font-semibold text-left'>
                    <div>
                        <h5>
                            <span>Delivery fee : </span>
                            <span>{order?.deliveryFee}$</span>
                        </h5>
                        <h5>
                            <span>Discount : </span>
                            <span>{order?.discount}$</span>
                        </h5>
                        <h5>
                            <span>Other details : </span>
                            <span className='text-[12px] tracking-normal'>{order?.paymentDetails || "No Details"}</span>
                        </h5>
                    </div>
                </td>
                <td className='text-[14px] tracking-wider font-semibold text-center'>
                    <DeleteButton className="px-5 py-1.5" mode='word' isLoading={isCancellingOrder} disabled={isCancellingOrder}
                    customWord='Cancel Order' onClick={() => { cancelOrderByAdminPrivilege(order,userToken) }} />
                </td>
            </tr>
            <tr>
                <td style={{ height: 0, padding: 0 }} colSpan={9}>
                    {isOpen && (
                        <div className={`mt-3 mb-4 w-full flex-col mx-2`}>
                            <h4 className='text-center text-lg font-semibold'>Order items</h4>
                            <div className='grid grid-cols-12'>
                                {order.orderItems.map((orderItem, index) => {
                                    return (
                                        <div className='col-span-4 flex flex-col px-2' key={index}>
                                            <h5 className='text-center text-base font-semibold'># {index + 1}</h5>
                                            <div className='flex flex-col border rounded-lg p-2'>
                                                <h5 className='font-semibold line-clamp-2'> <span className='text-base'>Product name: </span>{orderItem?.name}</h5>
                                                <h5 className='font-semibold'> <span className='text-base'>Product sold price for unit : </span>{orderItem?.price}$</h5>
                                                <h5 className='font-semibold'> <span className='text-base'>Product sold units : </span>{orderItem?.quantity}</h5>
                                                <div className='w-full h-40 flex items-center justify-center my-10'>
                                                    <img className={`rounded-md max-w-40 max-h-52 blur-sm duration-300 border`} src={`${orderItem?.thumbnailUrl}`} alt={`${orderItem?.name}`}
                                                        onLoad={(e) => {
                                                            const image = e?.currentTarget;
                                                            if (image) {
                                                                image.classList.remove("blur-sm")
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <Link className='text-base font-semibold tracking-wide rounded-lg text-white bg-color-accent text-center py-1.5 px-10 duration-300 hover:bg-sky-800 mx-auto' to={`/products/${orderItem?.productId}`}>
                                                    View Product
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <h4 className='text-center text-lg font-semibold mt-5 mb-2'>Customer</h4>
                            <div className='flex items-center justify-center flex-col border rounded-lg p-3 w-fit mx-auto'>
                                <div>
                                    <h5 className='tracking-wide text-base'><span className='font-semibold text-lg'>Name : </span>{order?.user[0].firstName + " " + order?.user[0].lastName}</h5>
                                    <h5 className='tracking-wide text-base'><span className='font-semibold text-lg'>Email : </span>{order?.user[0].email}</h5>
                                    <h5 className='tracking-wide text-base'><span className='font-semibold text-lg'>Role : </span>{order?.user[0].role}</h5>
                                </div>
                            </div>

                        </div>
                    )}
                </td>
            </tr>
        </React.Fragment>
    )
}

export default OrdersTableData