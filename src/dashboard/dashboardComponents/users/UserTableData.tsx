import { CSSProperties, useContext, useState } from 'react';
import { User } from '../../../types/types';
import DeleteButton from '../dashboardShared/DeleteButton'
import { defaultUserImage, getCorrectDate } from '../dashboardShared/helperFunctions'
import EditButton from '../dashboardShared/EditButton';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import useAxios from '../../../customHooks/useAxios';
import { toast } from 'react-toastify';
import EditModal from '../dashboardShared/EditModal';
import EditUser from './EditUser';
import { useSearchParams } from 'react-router-dom';

export interface IUserTableData {
  user: User;
  itemsNumber: number;
  index: number;
  getAllUsers: (page: string, limit: string) => any
}

function UserTableData({ user, itemsNumber, index, getAllUsers }: IUserTableData) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const commonTableDataStyles: CSSProperties = { color: "inherit", backgroundColor: "inherit", textAlign: "center", fontWeight: 500 }
  const { userToken } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const { DELETE } = useAxios();

  const deleteUser = async (user: User, userToken: string) => {
    try {
      if (confirm(`Are you sure you want to delete user with email ${user?.email}?`)) {
        setIsDeleting(true);

        const response = await DELETE(`/users/dashboard/${user?._id}`, {}, userToken);
        if (response.status === 204) {
          toast.success(`User with email ${user?.email} was deleted`);
          getAllUsers(searchParams.get("page"),searchParams.get("limit"));
        }
      }
    } catch (error) {
      toast.error(error);
      console.log(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <EditModal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} title="Edit User">
        <EditUser />
      </EditModal>
      <tr key={user?._id}>
        <td style={{ ...commonTableDataStyles }}>
          <p>
            #{itemsNumber + index + 1}
          </p>
        </td>
        <td style={{ ...commonTableDataStyles }}>{getCorrectDate(user?.createdAt)}</td>
        <td style={{ ...commonTableDataStyles }}>
          <p className='w-full text-center'>
            {user?.mobileNumber || "N/F"}
          </p>
        </td>
        <td>
          <div className='flex gap-x-3 rounded-md border-1 my-0.5'>
            <div className='flex-shrink-0 my-auto'>
              <img src={`${user?.userImg ? user?.userImg : defaultUserImage}`} alt={`${user?.firstName} image`}
                className='w-14 h-14 rounded-full'
              />
            </div>
            <div className='text-left font-semibold text-[14px]'>
              <h4 className='line-clamp-1 overflow-hidden'>{user?.firstName + user?.lastName}</h4>
              <h4 className='line-clamp-1 overflow-hidden'>{user?.email}</h4>
              <h4>role : {user?.role}</h4>
            </div>
          </div>
        </td>
        <td style={{ ...commonTableDataStyles }}>
          <div className='flex w-full justify-end gap-x-1 '>
            <DeleteButton mode='word' customWord='Delete User'
              isLoading={isDeleting} disabled={isDeleting} className='font-semibold tracking-wide px-3 whitespace-nowrap'
              onClick={() => {
                deleteUser(user, userToken);
              }} />
            <EditButton mode="word" customWord='Edit User' className='font-semibold tracking-wide px-3 whitespace-nowrap' onClick={() => setIsEditModalOpen(true)} />
          </div>
        </td>
      </tr>
    </>
  )
}

export default UserTableData