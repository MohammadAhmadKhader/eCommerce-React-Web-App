import { Fragment, useState, useEffect, useContext } from "react";
import TableWidthScrolling from '../dashboardShared/TableWidthScrolling'
import CustomTable from '../dashboardShared/CustomTable'
import TableLoading from '../../../components/shared/TableLoading';
import { useSearchParams } from "react-router-dom";
import EditButton from "../dashboardShared/EditButton";
import DeleteButton from "../dashboardShared/DeleteButton";
import { toast } from "react-toastify";
import useAxios from "../../../customHooks/useAxios";
import { UserContext } from "../../../components/features/UserFeature/UserProvider";
import EditModal from "../dashboardShared/EditModal";
import EditCategory from "./EditCategory";
import CategoriesTableData from "./CategoriesTableData";
import { getCorrectItemsNumber } from "../dashboardShared/helperFunctions";


function CategoriesTable({ categories, isLoading, count }: { categories: any[]; isLoading: boolean; count: number; }) {
    const commonStylesTableHeaders: { fontSize: string, fontWeight: number, textAlign: "center" }
        = { fontSize: "16px", fontWeight: 600, textAlign: "center" };

    const [itemsNumber, setItemsNumber] = useState<number>(0);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setItemsNumber(getCorrectItemsNumber(searchParams.get("page"),searchParams.get("limit")))
    }, [count, searchParams, categories]);

    return (
        <>
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
                            categories?.map((category, index) => {
                                return (
                                    <CategoriesTableData itemsNumber={itemsNumber}
                                     key={category?._id} index={index} category={category} /> 
                                )
                            })
                        }
                    </tbody>
                </CustomTable>
            </TableWidthScrolling>
        </>
    )
}

export default CategoriesTable