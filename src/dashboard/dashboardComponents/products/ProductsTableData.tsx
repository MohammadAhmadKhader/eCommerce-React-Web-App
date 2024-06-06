import React, { useContext, useState } from 'react'
import { IProduct } from '../../../types/types'
import EditButton from '../dashboardShared/EditButton';
import DeleteButton from '../dashboardShared/DeleteButton';
import TableProductsPriceComponent from './TableProductsPriceComponent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaChevronUp } from 'react-icons/fa6';
import ProductImage from './ProductImage';
import EditModal from '../dashboardShared/EditModal';
import EditProduct from './EditProduct';
import useAxios from '../../../customHooks/useAxios';
import { toast } from 'react-toastify';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import PatchImagesToProduct from './PatchImagesToProducts';
import TableDataMenu from '../dashboardShared/TableDataMenu';

export interface IProductTableData {
    product: IProduct;
    index: number;
    itemsNumber: number;
    categoriesMapper: object;
    getAllProducts: (page: string, limit: string) => any
}

function ProductsTableData({ product, index, itemsNumber, categoriesMapper, getAllProducts }: IProductTableData) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isPatchImagesModalOpen, setIsPatchImagesModalOpen] = useState<boolean>(false);
    const [isDeleteProductProcessing, setIsDeleteProductProcessing] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams()

    const { DELETE } = useAxios()
    const navigate = useNavigate();
    const { userToken } = useContext(UserContext);

    const deleteProduct = async (product, userToken) => {
        try {
            if (confirm(`Are you sure you want to delete product with name : '${product?.name}'`)) {
                setIsDeleteProductProcessing(true);
                const { status, data } = await DELETE(`/products/${product?._id}`, {}, userToken);
                console.log(status, data)
                if (status === 200) {
                    toast.success(`Product with name ${product?.name} was deleted`);
                    setIsDeleteProductProcessing(false);
                    getAllProducts(searchParams.get("page"), searchParams.get("limit"))
                }
            }
        } catch (error) {
            toast.error(error)
            console.log(error)
        } finally {
            setIsDeleteProductProcessing(true)
        }
    }

    const menuList = [{
        onClick: () => {
            navigate(`/products/${product?._id}?page=1&limit=9`)
        },
        text: "View",
    }, {
        onClick: () => {
            setIsPatchImagesModalOpen(true)
        },
        text: "Add Images",
    }, {
        onClick: () => {
            setIsEditModalOpen(true)
        },
        text: "Edit",
    }, {
        onClick: () => {
            deleteProduct(product, userToken)
        },
        text: "Delete",
    }
    ]
    const [isContextMenuOpen, setIsContextMenuOpen] = useState<null | HTMLElement>(null);
    const [xMenuPosition, setXMenuPosition] = useState<number>(0);
    const [yMenuPosition, setYMenuPosition] = useState<number>(0);

    return (
        <>
            <EditModal title='Edit Product' isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} DialogContentSx={{ paddingRight: "6px" }}>
                <EditProduct product={product} setIsEditModalOpen={setIsEditModalOpen} />
            </EditModal>

            <EditModal title='Add images' isOpen={isPatchImagesModalOpen} setIsOpen={setIsPatchImagesModalOpen} >
                <PatchImagesToProduct product={product} setIsPatchImagesModalOpen={setIsPatchImagesModalOpen} />
            </EditModal>

            <TableDataMenu x={xMenuPosition} y={yMenuPosition} menuList={menuList} header={{ fieldName: "Name", fieldValue: product?.name }}
                isContextMenuOpen={isContextMenuOpen} setIsContextMenuOpen={setIsContextMenuOpen} />
            <tr key={product?._id} data--num={itemsNumber + index + 1}
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
                <td className='text-[15px] tracking-wide font-semibold '>
                    <h4 className='line-clamp-2'>
                        {product?.name}
                    </h4>
                </td>
                <td>
                    <TableProductsPriceComponent product={product} />
                </td>
                <td className='text-center'>{product?.quantity}</td>
                <td className='text-center'>{Number(product?.avgRating).toFixed(2)} / 5</td>
                <td>
                    <div className='flex flex-col'>
                        <h4 className='font-semibold'>Brand : {product?.brand}</h4>
                        <h4 className='font-semibold'>Category : {categoriesMapper[product?.categoryId] || "N/F"}</h4>
                    </div>
                </td>
                <td>
                    <div className='flex gap-2 justify-center items-center tracking-wide font-semibold'>
                        <div className='flex flex-col w-full gap-y-2'>
                            <button className='w-full px-2 py-1 rounded-md border border-color-accent bg-color-accent
                             duration-500 hover:bg-sky-800 hover:border-sky-800 text-white'
                                onClick={() => {
                                    navigate(`/products/${product?._id}?page=1&limit=9`)
                                }}
                            >
                                View
                            </button>

                            <EditButton className='w-full' mode='both' onClick={() => setIsEditModalOpen(true)} />
                        </div>
                        <div className='flex flex-col w-full gap-y-2'>
                            <DeleteButton className='w-full' mode='both' onClick={() => { deleteProduct(product, userToken) }}
                                disabled={isDeleteProductProcessing} isLoading={isDeleteProductProcessing}
                            />
                            <EditButton className='w-full bg-purple-500 font-semibold hover:bg-purple-700'
                                onClick={() => setIsPatchImagesModalOpen(true)} customWord="Add Images" mode="word" />
                        </div>


                    </div>
                </td>
            </tr>
            <tr>
                <td style={{ height: 0, padding: 0 }} colSpan={8}>
                    {isOpen && (
                        <div className='my-3 w-full flex-col mx-2'>
                            <h4 className='text-center text-lg font-semibold'>{product?.name} images</h4>
                            <div className='grid grid-cols-12 gap-x-2 rounded-lg'>
                                {product.images.map((imageObj) => {
                                    return (
                                        <ProductImage imageObj={imageObj} product={product} key={imageObj?._id} getAllProducts={getAllProducts} />
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </td>
            </tr>
        </>
    )
}

export default ProductsTableData