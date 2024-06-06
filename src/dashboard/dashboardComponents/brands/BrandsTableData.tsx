import React, { useContext, useEffect, useState } from 'react'
import EditButton from '../dashboardShared/EditButton';
import DeleteButton from '../dashboardShared/DeleteButton';
import EditModal from '../dashboardShared/EditModal';
import EditBrand from './EditBrand';
import useAxios from '../../../customHooks/useAxios';
import { toast } from 'react-toastify';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import TableDataMenu from '../dashboardShared/TableDataMenu';




function BrandsTableData({ brand, index, itemsNumber }) {

    const commonStylesTableData: { fontSize: string, fontWeight: number, textAlign: "center" }
        = { fontSize: "16px", fontWeight: 500, textAlign: "center" };

    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteProcessIsLoading, setIsDeleteProcessIsLoading] = useState<boolean>(false);
    const { DELETE } = useAxios();
    const { userToken } = useContext(UserContext);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState<null | HTMLElement>(null);
    const [xMenuPosition, setXMenuPosition] = useState<number>(0);
    const [yMenuPosition, setYMenuPosition] = useState<number>(0);

    const deleteBrand = async (brand: any, userToken: string) => {
        try {
            if (confirm(`Are you sure you want to delete brand with name '${brand?.name}'?`)) {
                setIsDeleteProcessIsLoading(true);

                const { status } = await DELETE(`/brands/${brand?._id}`, {}, userToken);
                if (status === 204) {
                    toast.success(`Brand with name : ${brand?.name} was deleted`);
                }
            }

        } catch (error) {
            toast.error(error);
            console.log(error)
        } finally {
            setIsDeleteProcessIsLoading(false);
        }
    }
    const menuList = [{
            onClick:()=>{
                setIsEditModalOpen(true)
            },
            text:"Edit",
        },{
            onClick:()=>{
                deleteBrand(brand, userToken)
            },
            text:"Delete",
        }
    ]

    return (
        <>
            <tr onContextMenu={(e) => {
                e.preventDefault()
                setXMenuPosition(e.clientX)
                setYMenuPosition(e.clientY)
                console.log(e.clientX, e.clientY)
                setIsContextMenuOpen(e.currentTarget);
            }}
            
            >
                <td style={{ ...commonStylesTableData }}>#{itemsNumber + index + 1}</td>
                <td style={{ ...commonStylesTableData }}>{brand?.name}</td>
                <td>
                    <div className="rounded-md w-32 h-32 my-2 bg-gray-100 flex justify-center items-center mx-auto">
                        <img className="rounded-md blur-sm duration-300" src={`${brand?.imageUrl}`} alt={`${brand?.name}`}
                            onLoad={(e) => {
                                const img = e?.currentTarget;
                                if (img) {
                                    img.classList.remove("blur-sm")
                                }
                            }}
                        />
                    </div>
                </td>
                <td>
                    <div className="flex justify-center items-center mx-auto gap-x-2">
                        <EditButton className='min-w-24 font-semibold' mode="both" onClick={() => { setIsEditModalOpen(true) }} />
                        <DeleteButton className='font-semibold min-w-24' mode="both" onClick={() => { deleteBrand(brand, userToken) }}
                            isLoading={false} disabled={isDeleteProcessIsLoading} />
                    </div>
                </td>
            </tr>

            <EditModal title="Update brand" isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} >
                <EditBrand brand={brand} setIsEditModalOpen={setIsEditModalOpen} />
            </EditModal>

            <TableDataMenu x={xMenuPosition} y={yMenuPosition} menuList={menuList} header={{fieldName:"Name",fieldValue:brand?.name}}
                isContextMenuOpen={isContextMenuOpen} setIsContextMenuOpen={setIsContextMenuOpen} />
        </>
    )
}

export default BrandsTableData