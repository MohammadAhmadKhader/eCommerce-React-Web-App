import { useContext, useEffect, useState } from 'react'
import UsersTable from './UsersTable'
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import useAxios from '../../../customHooks/useAxios';
import { User } from '../../../types/types';
import { useSearchParams } from 'react-router-dom';
import TableLayout from '../dashboardShared/TableLayout';

function DashboardUsers() {
    const { userToken } = useContext(UserContext);
    const [users, setUsers] = useState<User[] | []>([]);
    const [count, setCount] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const { GET, isLoading, setIsLoading } = useAxios();

    useEffect(() => {
        getAllUsers(searchParams.get("page"), searchParams.get("limit"));
    }, [searchParams])

    const getAllUsers = async (page, limit) => {
        try {
            const { data } = await GET(`/dashboard/users?page=${page}&limit=${limit}`, userToken);

            setUsers(data.users);
            setCount(data.count);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TableLayout count={count} title='Users'>
            <div className='my-5'>
                <UsersTable users={users} isLoading={isLoading} count={count} getAllUsers={getAllUsers} />
            </div>
        </TableLayout>
    )
}

export default DashboardUsers