import TableWidthScrolling from '../dashboardShared/TableWidthScrolling'
import CustomTable from '../dashboardShared/CustomTable'
import { IProduct } from '../../../types/types';
import TableLoading from '../../../components/shared/TableLoading';
import ProductsTableData from './ProductsTableData';
import { useContext, useEffect, useState } from 'react';
import { getCorrectItemsNumber } from '../dashboardShared/helperFunctions';
import { useSearchParams } from 'react-router-dom';
import { GlobalCachingContext } from '../../../components/features/GlobalCachingContext/GlobalCachingProvider';

function ProductsTable({ products, isLoading, count, getAllProducts }: { products: IProduct[]; isLoading: boolean; count: number; getAllProducts: (page: string, limit: string) => any }) {
    const commonStylesTableHeaders = { fontSize: "16px", fontWeight: 600 };

    const [searchParams, setSearchParams] = useSearchParams();
    const [itemsNumber, setItemsNumber] = useState<number>(0);
    const { categories } = useContext(GlobalCachingContext);
    const [categoriesMapper, setCategoriesMapper] = useState({});

    useEffect(() => {
        setItemsNumber(getCorrectItemsNumber(searchParams.get("page"), searchParams.get("limit")))
        categories?.forEach((category) => {
            categoriesMapper[category?._id] = category?.name;
        });

    }, [count, searchParams, categories]);
    return (
        <TableWidthScrolling >
            <CustomTable minWidth={1000}>
                <thead>
                    <tr>
                        <td style={{ width: "30px" }}></td>
                        <td style={{ ...commonStylesTableHeaders, width: "80px", textAlign: "center" }}>Number</td>
                        <td style={{ ...commonStylesTableHeaders, width: "200px" }}>Name</td>
                        <td style={{ ...commonStylesTableHeaders, width: "140px", textAlign: "left" }}>Pricing</td>
                        <td style={{ ...commonStylesTableHeaders, width: "120px", textAlign: "center" }}>Quantity</td>
                        <td style={{ ...commonStylesTableHeaders, width: "120px", textAlign: "center" }}>Avg Rating</td>
                        <td style={{ ...commonStylesTableHeaders, width: "180px" }}>Metadata</td>
                        <td style={{ ...commonStylesTableHeaders, width: "240px", textAlign: "center" }}>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <TableLoading LoadingRows={15} LoadingCols={8} /> :
                        products.map((product, index) => {
                            return (
                                <ProductsTableData key={product?._id} product={product} index={index}
                                    categoriesMapper={categoriesMapper} itemsNumber={itemsNumber} getAllProducts={getAllProducts} />
                            )
                        })
                    }
                </tbody>
            </CustomTable>
        </TableWidthScrolling>
    )
}

export default ProductsTable