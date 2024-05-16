import DeleteButton from '../dashboardShared/DeleteButton';
import CustomTable from '../dashboardShared/CustomTable';
import { User } from '../../../types/types';
import TableLoading from '../../../components/shared/TableLoading';
import TableWidthScrolling from '../dashboardShared/TableWidthScrolling';
import { useSearchParams } from 'react-router-dom';
import { CSSProperties, useEffect, useState } from 'react';
import { getCorrectDate, getCorrectItemsNumber } from '../dashboardShared/helperFunctions';
import UserTableData from './UserTableData';

const commonTableHeadersStyles: CSSProperties = { color: "inherit", backgroundColor: "inherit", textAlign: "center", fontWeight: 600 }
const defaultUserImage = "https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/UsersImages/rtnfqs2mx3rvvgleayna"

function UsersTable({ users, isLoading, count,getAllUsers }: { users: User[]; isLoading: boolean, count: number,getAllUsers:(page:string,limit:string)=>any }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [itemsNumber, setItemsNumber] = useState(0);

    useEffect(() => {
        setItemsNumber(getCorrectItemsNumber(searchParams.get("page"), searchParams.get("limit")));

    }, [count, searchParams]);

    return (
        <TableWidthScrolling>
            <CustomTable minWidth={900}>
                <thead >
                    <tr >
                        <th style={{ ...commonTableHeadersStyles, width: "70px" }}>Number</th>
                        <th style={{ ...commonTableHeadersStyles, width: "120px" }}>Registered</th>
                        <th style={{ ...commonTableHeadersStyles, width: "140px" }}>Mobile</th>
                        <th style={{ ...commonTableHeadersStyles, width: "370px" }}>Information</th>
                        <th style={{ ...commonTableHeadersStyles, width: "240px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <TableLoading LoadingCols={5} LoadingRows={15} />
                        : users?.map((user, index) => (
                            <UserTableData key={user?._id} index={index} itemsNumber={itemsNumber} user={user} getAllUsers={getAllUsers} />
                        ))}
                </tbody>
            </CustomTable>
        </TableWidthScrolling>
    )
}

export default UsersTable