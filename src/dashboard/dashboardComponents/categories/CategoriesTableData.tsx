import React, { useContext, useState } from 'react'
import EditModal from '../dashboardShared/EditModal';
import EditCategory from './EditCategory';
import { toast } from 'react-toastify';
import useAxios from '../../../customHooks/useAxios';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import EditButton from '../dashboardShared/EditButton';
import DeleteButton from '../dashboardShared/DeleteButton';

function CategoriesTableData({category,index,itemsNumber}) {
    const [isEditModelOpen, setIsEditModelOpen] = useState<boolean>(false)
    const { DELETE, PUT } = useAxios();
    const { userToken } = useContext(UserContext);

    const commonStylesTableData: { fontSize: string, fontWeight: number, textAlign: "center" }
        = { fontSize: "16px", fontWeight: 500, textAlign: "center" };
    

    const deleteCategory = async (category: any, userToken: string) => {
        try {
            if(confirm(`Are you sure you want to delete category with name '${category.name}'`)){
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
    
  return (
    <>
        <tr>
            <td style={{ ...commonStylesTableData }}>{itemsNumber + index + 1}</td>
            <td style={{ ...commonStylesTableData }}>{category?.name}</td>
            <td>
                <div className="rounded-md w-20 h-20 bg-gray-100 flex justify-center items-center mx-auto">
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
                    <EditButton mode="both" onClick={() => setIsEditModelOpen(true)} />
                    <DeleteButton mode="both" onClick={() => { deleteCategory(category, userToken) }} />
                </div>
            </td>
        </tr>
        <EditModal isOpen={isEditModelOpen} setIsOpen={setIsEditModelOpen} title="Edit Category" >
            <EditCategory category={category} setIsEditModelOpen={setIsEditModelOpen}/>
        </EditModal>
    </>
  )
}

export default CategoriesTableData