import React, { useContext, useState } from 'react'
import DeleteButton from '../dashboardShared/DeleteButton'
import { Tooltip } from '@mui/joy'
import { defaultUserImage, getCorrectDate } from '../dashboardShared/helperFunctions'
import { toast } from 'react-toastify';
import useAxios from '../../../customHooks/useAxios';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';

function ReviewsTableData({ review, itemsNumber, index }) {
    const commonStylesTableData: { fontSize: string, fontWeight: number, textAlign: "center" | "left" }
        = { fontSize: "16px", fontWeight: 500, textAlign: "center" };
    const commonStylesTableHeaders: { fontSize: string, fontWeight: number, textAlign: "center" | "left" }
        = { fontSize: "16px", fontWeight: 600, textAlign: "center" };

    const [isReviewDeleteProcessing, setIsReviewDeleteProcessing] = useState<boolean>(false);
    const { DELETE } = useAxios();
    const { userToken } = useContext(UserContext);
    const deleteUserReview = async (review, userToken) => {
        try {
            if (confirm(`Are you sure you want to delete the review with comment "${review?.comment}" for user '${review?.user?.firstName + " " + review?.user?.lastName}'?`)) {
                setIsReviewDeleteProcessing(true);
                const { status } = await DELETE(`/reviews/${review?.productId}/${review?._id}`, {}, userToken);
                if (status === 204) {
                    toast.success("Review was deleted");
                }
            }

        } catch (error) {
            toast.error(error);
            console.log(error);
        } finally {
            setIsReviewDeleteProcessing(false)
        }
    }


    return (
        <tr key={review?._id}>
            <td style={{ ...commonStylesTableData }}>#{itemsNumber + index + 1}</td>
            <td style={{ ...commonStylesTableData, textAlign: "left" }}>{review?.comment}</td>
            <td style={{ ...commonStylesTableHeaders }}>{review?.rating} / 5</td>
            <td style={{ ...commonStylesTableHeaders }}>{getCorrectDate(review?.createdAt)}</td>
            <td style={{ ...commonStylesTableHeaders, textAlign: "left" }}>
                <div className="flex items-center gap-x-2 border rounded-lg p-2 overflow-auto">
                    <div className="w-20 flex-shrink-0 my-2">
                        <img className="rounded-full w-full aspect-square border" src={`${review?.user?.userImg ? review?.user?.userImg : defaultUserImage}`} alt={`${review?.user?.firstName + review?.user?.lastName}`} />
                    </div>
                    <div>
                        <h5>
                            <span>Name : </span>
                            <Tooltip title={`${review?.user?.firstName + review?.user?.lastName}`}>
                                <span className="text-sm" >{review?.user?.firstName + review?.user?.lastName}</span>
                            </Tooltip>
                        </h5>
                        <h5>
                            <span>Email : </span>
                            <Tooltip title={`${review?.user?.email}`}>
                                <span className="text-sm" >{review?.user?.email}</span>
                            </Tooltip>
                        </h5>
                        <h5>
                            <span>Role : </span>
                            <span className="text-sm">{review?.user?.role}</span>
                        </h5>
                    </div>
                </div>
            </td>
            <td>
                <div className="flex justify-center items-center mx-auto gap-x-2">
                    <DeleteButton customWord="Delete comment" className="font-semibold px-4" mode="both"
                        onClick={() => { deleteUserReview(review, userToken) }}
                        isLoading={isReviewDeleteProcessing} disabled={isReviewDeleteProcessing} />

                </div>
            </td>
        </tr>
    )
}

export default ReviewsTableData