import DeleteButton from '../dashboardShared/DeleteButton';
import CustomTable from '../dashboardShared/CustomTable';
import { User } from '../../../types/types';
import TableLoading from '../../../components/shared/TableLoading';
import TableWidthScrolling from '../dashboardShared/TableWidthScrolling';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const commonStyle: any = { color: "inherit", backgroundColor: "inherit", textAlign: "center" }
const defaultUserImage = "https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/UsersImages/rtnfqs2mx3rvvgleayna"
function getCorrectDate(date: string) {
    const correctDate = new Date(date).toDateString().replace((new Date(date).toDateString().split(" ").shift()), "")
    return correctDate;
}

function UsersTable({ users, isLoading, count, }: { users: User[]; isLoading: boolean, count: number }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [itemsNumber, setItemsNumber] = useState(0);

    useEffect(() => {
        setItemsNumber((Number(searchParams.get("page") || 1) * Number(searchParams.get("limit") || 9) - Number(searchParams.get("limit") || 9)))
    }, [count, searchParams])
    return (
        <TableWidthScrolling>
            <CustomTable minWidth={700}>
                <thead >
                    <tr >
                        <th style={{ ...commonStyle, width: "5%" }}>Number</th>
                        <th style={{ ...commonStyle, width: "120px" }}>Registered</th>
                        <th style={{ ...commonStyle, width: "120px" }}>Mobile</th>
                        <th style={{ ...commonStyle }}>Information</th>
                        <th style={{ ...commonStyle, width: "80px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <TableLoading LoadingCols={5} LoadingRows={15} />
                        : users?.map((user, index) => (
                            <tr key={user?._id}>
                                <td style={{ ...commonStyle, minWidth: "30px", maxWidth: "50px" }}>
                                    <p>
                                        #{itemsNumber + index + 1}
                                    </p>
                                </td>
                                <td style={{ ...commonStyle, maxWidth: "120px" }}>{getCorrectDate(user?.createdAt)}</td>
                                <td style={{ ...commonStyle, width: "80px" }}>
                                    <p className='w-full text-center'>
                                        {user?.mobileNumber || "N/F"}
                                    </p>
                                </td>
                                <td>
                                    <div className='flex gap-x-3 xl:ms-80 rounded-md border-1'>
                                        <div className='flex-shrink-0'>
                                            <img src={`${user?.userImg ? user?.userImg : defaultUserImage}`} alt={`${user?.firstName} image`}
                                                className='w-8 h-8 rounded-full'
                                            />
                                        </div>
                                        <div className='text-left font-semibold text-[11px]'>
                                            <h4 className='line-clamp-1 overflow-hidden'>{user?.firstName + user?.lastName}</h4>
                                            <h4 className='line-clamp-1 overflow-hidden'>{user?.email}</h4>
                                            <h4>role : {user?.role}</h4>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ ...commonStyle, maxWidth: "120px" }}>
                                    <div className='flex w-full justify-end gap-x-1 justify-center'>
                                        <DeleteButton mode='word' onClick={() => {
                                            if (confirm("Are you sure you want to delete this user ?")) {
                                                console.log("Confirmed")
                                            }
                                        }} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </CustomTable>
        </TableWidthScrolling>
    )
}

export default UsersTable