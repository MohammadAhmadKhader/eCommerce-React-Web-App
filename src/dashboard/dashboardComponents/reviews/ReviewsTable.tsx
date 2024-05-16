import { useState, useEffect } from "react";
import TableWidthScrolling from '../dashboardShared/TableWidthScrolling'
import CustomTable from '../dashboardShared/CustomTable'
import TableLoading from '../../../components/shared/TableLoading';
import { useSearchParams } from "react-router-dom";
import ReviewsTableData from "./ReviewsTableData";

function ReviewsTable({ reviews, isLoading, count }: { reviews: any[]; isLoading: boolean; count: number; }) {
    const commonStylesTableHeaders: { fontSize: string, fontWeight: number, textAlign: "center" | "left" }
        = { fontSize: "16px", fontWeight: 600, textAlign: "center" };

    const [itemsNumber, setItemsNumber] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setItemsNumber((Number(searchParams.get("page") || 1) * Number(searchParams.get("limit") || 9) - Number(searchParams.get("limit") || 9)));
        console.log(reviews, "reviews")
    }, [count, searchParams, reviews]);

    return (
        <TableWidthScrolling >
            <CustomTable minWidth={1000}>
                <thead>
                    <tr>
                        <td style={{ ...commonStylesTableHeaders, width: "80px" }}>Number</td>
                        <td style={{ ...commonStylesTableHeaders, width: "300px", textAlign: "center" }}>Comment</td>
                        <td style={{ ...commonStylesTableHeaders, width: "60px" }}>Rating</td>
                        <td style={{ ...commonStylesTableHeaders, width: "140px" }}>Date</td>
                        <td style={{ ...commonStylesTableHeaders, width: "400px" }}>User Information</td>
                        <td style={{ ...commonStylesTableHeaders, width: "200px" }}>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <TableLoading LoadingRows={15} LoadingCols={6} /> :
                        reviews?.map(({ review }, index) => {
                            return (
                                <ReviewsTableData key={review?._id} review={review} index={index} itemsNumber={itemsNumber} />
                            )
                        })
                    }
                </tbody>
            </CustomTable>
        </TableWidthScrolling>
    )
}

export default ReviewsTable