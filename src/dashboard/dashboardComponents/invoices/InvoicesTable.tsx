import TableLoading from "../../../components/shared/TableLoading";
import CustomTable from "../dashboardShared/CustomTable";
import TableWidthScrolling from "../dashboardShared/TableWidthScrolling";
import InvoicesTableData from "./InvoicesTableData";

function InvoicesTable({ invoices, isLoading, count }: { invoices: any[]; isLoading: boolean; count: number; }) {
    const commonStylesTableHeaders = { fontSize: "16px", fontWeight: 600 };
    return (
        <TableWidthScrolling >
            <CustomTable minWidth={700}>
                <thead>
                    <tr>
                        <td style={{ width: "30px" }}></td>
                        <td style={{ ...commonStylesTableHeaders, width: "80px", textAlign: "center" }}>Number</td>
                        <td style={{ ...commonStylesTableHeaders, width: "150px", textAlign: "center" }}>SubTotal</td>
                        <td style={{ ...commonStylesTableHeaders, width: "150px", textAlign: "center" }}>GrandTotal</td>
                        <td style={{ ...commonStylesTableHeaders, width: "240px", textAlign: "center" }}>OrderId</td>
                        <td style={{ ...commonStylesTableHeaders, width: "140px", textAlign: "center" }}>Initiated At</td>
                        <td style={{ ...commonStylesTableHeaders, width: "240px", textAlign: "center" }}>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <TableLoading LoadingRows={15} LoadingCols={7} /> :
                        invoices.map((invoice, index) => {
                            return (
                                <InvoicesTableData count={count} invoice={invoice} index={index} key={invoice?._id} />
                            )
                        })
                    }
                </tbody>
            </CustomTable>
        </TableWidthScrolling>
    )
}

export default InvoicesTable