import { useEffect, useState } from "react";
import TableLoading from "../../../components/shared/TableLoading";
import CustomTable from "../dashboardShared/CustomTable";
import TableWidthScrolling from "../dashboardShared/TableWidthScrolling";
import OrdersTableData from "./OrdersTableData";
import { useSearchParams } from "react-router-dom";

function OrdersTable({ orders, isLoading, count }: { orders: any[]; isLoading: boolean; count: number; }) {
    const commonStylesTableHeaders = { fontSize: "16px", fontWeight: 600 };
    const [searchParams, setSearchParams] = useSearchParams();
    const [itemsNumber, setItemsNumber] = useState<number>(0);

    useEffect(() => {
        setItemsNumber((Number(searchParams.get("page") || 1) * Number(searchParams.get("limit") || 9) - Number(searchParams.get("limit") || 9)))

    }, [count, searchParams]);
    return (
        <TableWidthScrolling >
            <CustomTable minWidth={700}>
                <thead>
                    <tr>
                        <td style={{ width: "30px" }}></td>
                        <td style={{ ...commonStylesTableHeaders, width: "80px", textAlign: "center" }}>Number</td>
                        <td style={{ ...commonStylesTableHeaders, width: "240px", textAlign: "center" }}>Order ID</td>
                        <td style={{ ...commonStylesTableHeaders, width: "120px", textAlign: "center" }}>SubTotal</td>
                        <td style={{ ...commonStylesTableHeaders, width: "120px", textAlign: "center" }}>GrandTotal</td>
                        <td style={{ ...commonStylesTableHeaders, width: "80px", textAlign: "center" }}>Status</td>
                        <td style={{ ...commonStylesTableHeaders, width: "140px", textAlign: "center" }}>Initiated At</td>
                        <td style={{ ...commonStylesTableHeaders, width: "190px", textAlign: "center" }}>Metadata</td>
                        <td style={{ ...commonStylesTableHeaders, width: "140px", textAlign: "center" }}>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <TableLoading LoadingRows={15} LoadingCols={9} /> :
                        orders.map((order, index) => {
                            return (
                                <OrdersTableData key={order?._id} order={order} index={index} itemsNumber={itemsNumber} />
                            )
                        })
                    }
                </tbody>
            </CustomTable>
        </TableWidthScrolling>
    )
}

export default OrdersTable