import { Fragment, useState, useEffect, useContext } from "react";
import TableWidthScrolling from '../dashboardShared/TableWidthScrolling'
import CustomTable from '../dashboardShared/CustomTable'
import TableLoading from '../../../components/shared/TableLoading';
import BrandsTableData from "./BrandsTableData";
import { useSearchParams } from "react-router-dom";
import { getCorrectItemsNumber } from "../dashboardShared/helperFunctions";


function BrandsTable({ brands, isLoading, count }: { brands: any[]; isLoading: boolean; count: number; }) {
    const commonStylesTableHeaders: { fontSize: string, fontWeight: number, textAlign: "center" }
        = { fontSize: "16px", fontWeight: 600, textAlign: "center" };

    const [itemsNumber, setItemsNumber] = useState<number>(0);
    const [searchParams, setSearchParams] = useSearchParams();

    
    useEffect(() => {
        setItemsNumber(getCorrectItemsNumber(searchParams.get("page"),searchParams.get("limit")))

    }, [count, searchParams,brands]);

    return (
        <TableWidthScrolling >
            <CustomTable minWidth={1000}>
                <thead>
                    <tr>
                        <td style={{ ...commonStylesTableHeaders }}>Number</td>
                        <td style={{ ...commonStylesTableHeaders }}>Name</td>
                        <td style={{ ...commonStylesTableHeaders }}>Image</td>
                        <td style={{ ...commonStylesTableHeaders }}>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <TableLoading LoadingRows={15} LoadingCols={4} /> :
                        brands?.map((brand, index) => {
                            return (
                               <BrandsTableData key={brand?._id} brand={brand}
                                index={index} itemsNumber={itemsNumber}/>
                            )
                        })
                    }
                </tbody>
            </CustomTable>
        </TableWidthScrolling>
    )
}

export default BrandsTable