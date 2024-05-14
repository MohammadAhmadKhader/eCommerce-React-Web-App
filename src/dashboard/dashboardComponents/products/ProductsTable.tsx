import TableWidthScrolling from '../dashboardShared/TableWidthScrolling'
import CustomTable from '../dashboardShared/CustomTable'
import { IProduct } from '../../../types/types';
import TableLoading from '../../../components/shared/TableLoading';
import ProductsTableData from './ProductsTableData';


function ProductsTable({ products, isLoading, count }: { products: IProduct[]; isLoading: boolean; count: number; }) {
    const commonStylesTableHeaders = { fontSize: "16px", fontWeight: 600 };
    return (
        <TableWidthScrolling >
            <CustomTable minWidth={1000}>
                <thead>
                    <tr>
                        <td style={{ width: "30px" }}></td>
                        <td style={{ ...commonStylesTableHeaders, width: "80px", textAlign: "center" }}>Number</td>
                        <td style={{ ...commonStylesTableHeaders, width: "350px" }}>Name</td>
                        <td style={{ ...commonStylesTableHeaders, width: "140px", textAlign: "left" }}>Pricing</td>
                        <td style={{ ...commonStylesTableHeaders, width: "120px", textAlign: "center" }}>Quantity</td>
                        <td style={{ ...commonStylesTableHeaders, width: "120px", textAlign: "center" }}>Avg Rating</td>
                        <td style={{ ...commonStylesTableHeaders, width: "180px" }}>Metadata</td>
                        <td style={{ ...commonStylesTableHeaders, width: "240px", textAlign: "center" }}>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <TableLoading LoadingRows={15} LoadingCols={4} /> :
                        products.map((product, index) => {
                            return (
                                <ProductsTableData count={count} product={product} index={index} key={product?._id} />
                            )
                        })
                    }
                </tbody>
            </CustomTable>
        </TableWidthScrolling>
    )
}

export default ProductsTable