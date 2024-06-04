import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaChevronUp } from 'react-icons/fa6';
import { getCorrectDate } from '../dashboardShared/helperFunctions';
import { LuDownload } from "react-icons/lu"
import TableDataMenu from '../dashboardShared/TableDataMenu';

export interface IInvoiceTableData {
    invoice: any;
    count: number;
    index: number;
}

function InvoicesTableData({ invoice, count, index }: IInvoiceTableData) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [itemsNumber, setItemsNumber] = useState(0);
    const downloadBtnRef = useRef<null | HTMLAnchorElement>(null);

    useEffect(() => {
        setItemsNumber((Number(searchParams.get("page") || 1) * Number(searchParams.get("limit") || 9) - Number(searchParams.get("limit") || 9)))

    }, [count, searchParams]);

    const [isContextMenuOpen, setIsContextMenuOpen] = useState<null | HTMLElement>(null);
    const [xMenuPosition, setXMenuPosition] = useState<number>(0);
    const [yMenuPosition, setYMenuPosition] = useState<number>(0);
    const menuList = [{
        onClick: () => {
            if(downloadBtnRef.current){
                downloadBtnRef.current.click();
            }
        },
        text: "Download invoice",
    }
    ]
    return (
        <React.Fragment>
            <TableDataMenu x={xMenuPosition} y={yMenuPosition} menuList={menuList}
                header={{ fieldName: "ID", fieldValue: `${invoice?._id}` }}
                isContextMenuOpen={isContextMenuOpen} setIsContextMenuOpen={setIsContextMenuOpen} />

            <tr key={invoice?._id}
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
                <td className='text-[15px] tracking-wide font-semibold text-center'>
                    {invoice?.subTotal}$
                </td>
                <td className='text-[15px] tracking-wide font-semibold text-center'>
                    {invoice?.grandTotal}$
                </td>
                <td className='text-[14px] tracking-wider font-semibold text-center'>
                    #{invoice?.orderId}
                </td>
                <td className='text-[14px] tracking-wider font-semibold text-center'>
                    {getCorrectDate(invoice?.createdAt)}
                </td>
                <td className='text-[14px] tracking-wider font-semibold text-center'>
                    <div>
                        <Link to={`${invoice.pdfLink}`} ref={downloadBtnRef}
                         className='bg-color-accent px-3 py-1.5 flex items-center text-white rounded-md gap-x-2 justify-center hover:bg-sky-700 duration-300'>
                            <LuDownload size={20} />
                            <span>Download invoice</span>

                        </Link>
                    </div>
                </td>
            </tr>
            <tr>
                <td style={{ height: 0, padding: 0 }} colSpan={7}>
                    {isOpen && (
                        <div className='my-3 w-full flex-col mx-2'>
                            <h4 className='text-center text-lg font-semibold'>Invoice items</h4>
                            <div className='grid grid-cols-12 gap-y-2'>
                                {invoice.invoiceItems.map((invoiceItem, index) => {
                                    return (
                                        <div className='col-span-4 flex flex-col px-2' key={index}>
                                            <h5 className='text-center text-base font-semibold'># {index + 1}</h5>
                                            <div className='flex flex-col border rounded-lg p-2'>
                                                <p className='font-semibold'> <span className='text-base'>Product Id : </span>#{invoiceItem?.productId}</p>
                                                <p className='font-semibold'> <span className='text-base'>Quantity : </span>{invoiceItem?.quantity}</p>
                                                <p className='font-semibold'> <span className='text-base'>Price per unit : </span>{invoiceItem?.unitPrice}$</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </td>
            </tr>
        </React.Fragment>
    )
}

export default InvoicesTableData