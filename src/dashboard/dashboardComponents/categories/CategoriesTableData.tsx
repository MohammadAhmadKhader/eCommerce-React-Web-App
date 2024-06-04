import React, { useContext, useState } from 'react'
import EditModal from '../dashboardShared/EditModal';
import EditCategory from './EditCategory';
import { toast } from 'react-toastify';
import useAxios from '../../../customHooks/useAxios';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import EditButton from '../dashboardShared/EditButton';
import DeleteButton from '../dashboardShared/DeleteButton';
import TableDataMenu from '../dashboardShared/TableDataMenu';

function CategoriesTableData({ category, index, itemsNumber }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const { DELETE, PUT } = useAxios();
    const { userToken } = useContext(UserContext);

    const commonStylesTableData: { fontSize: string, fontWeight: number, textAlign: "center" }
        = { fontSize: "16px", fontWeight: 500, textAlign: "center" };
    


    const deleteCategory = async (category: any, userToken: string) => {
        try {
            if (confirm(`Are you sure you want to delete category with name '${category.name}'`)) {
                const { status } = await DELETE(`/categories/${category._id}`, {}, userToken);

                if (status === 204) {
                    toast.success("Category was deleted");
                }
            }
        } catch (error) {
            toast.error(error);
            console.log(error)
        }
    }
    const menuList = [{
        onClick:()=>{
            setIsEditModalOpen(true)
        },
        text:"Edit",
    },{
        onClick:()=>{
            deleteCategory(category, userToken)
        },
        text:"Delete",
    }
]
    const [isContextMenuOpen, setIsContextMenuOpen] = useState<null | HTMLElement>(null);
    const [xMenuPosition, setXMenuPosition] = useState<number>(0);
    const [yMenuPosition, setYMenuPosition] = useState<number>(0);

    return (
        <>
            <tr onContextMenu={(e) => {
                e.preventDefault()
                setXMenuPosition(e.clientX)
                setYMenuPosition(e.clientY)
                
                setIsContextMenuOpen(e.currentTarget);
            }}>
                <td style={{ ...commonStylesTableData }}>#{itemsNumber + index + 1}</td>
                <td style={{ ...commonStylesTableData }}>{category?.name}</td>
                <td>
                    <div className="rounded-md w-28 h-28 bg-gray-100 flex justify-center items-center mx-auto">
                        <img className="rounded-md blur-sm duration-300" src={`${category?.imageUrl}`} alt={`${category?.name}`}
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
                        <EditButton className='w-full' mode="both" onClick={() => setIsEditModalOpen(true)} />
                        <DeleteButton className='w-full' mode="both" onClick={() => { deleteCategory(category, userToken) }} />
                    </div>
                </td>
            </tr>
            <EditModal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} title="Edit Category" >
                <EditCategory category={category} setIsEditModalOpen={setIsEditModalOpen} />
            </EditModal>

            <TableDataMenu x={xMenuPosition} y={yMenuPosition} menuList={menuList} header={{fieldName:"Name",fieldValue:category?.name}}
                isContextMenuOpen={isContextMenuOpen} setIsContextMenuOpen={setIsContextMenuOpen} />
        </>
    )
}

export default CategoriesTableData