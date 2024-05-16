import DashboardAccordion from "./dashboardComponents/dashboardShared/DashboardAccordion"
import AccordionGroup from '@mui/joy/AccordionGroup';
import UsersNav from "./dashboardComponents/users/UsersNav";
import ProductsNav from "./dashboardComponents/products/ProductsNav";
import OrdersNav from "./dashboardComponents/orders/OrdersNav";
import InvoicesNav from "./dashboardComponents/invoices/InvoicesNav";
import ReviewsNav from "./dashboardComponents/reviews/ReviewsNav";
import { useContext } from "react";
import { ThemeContext } from "../components/features/ThemeFeature/ThemeProvider";
import { FaRegCommentDots, FaUsers } from "react-icons/fa";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { BsBoxSeam } from "react-icons/bs";
import { LuFileBox } from "react-icons/lu";
import BrandsNav from "./dashboardComponents/brands/BrandsNav";
import CategoriesNav from "./dashboardComponents/categories/CategoriesNav";
import { MdOutlineCategory } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";

function DashboardSidebar() {
    const { theme } = useContext(ThemeContext);

    return (
        <div className="min-h-screen border-r md:border-r-[3px]" style={{
            borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
        }}>
            <AccordionGroup sx={{ paddingInline: "0px" }}>
                <DashboardAccordion Title="Categories" AccordionComponent={CategoriesNav} Icon={MdOutlineCategory} />
                <DashboardAccordion Title="Brands" AccordionComponent={BrandsNav} Icon={SiBrandfolder} />
                <DashboardAccordion Title="Products" AccordionComponent={ProductsNav} Icon={BsBoxSeam} />
                <DashboardAccordion Title="Orders" AccordionComponent={OrdersNav} Icon={LuFileBox} />
                <DashboardAccordion Title="Invoices" AccordionComponent={InvoicesNav} Icon={LiaFileInvoiceSolid} />
                <DashboardAccordion Title="Users" AccordionComponent={UsersNav} Icon={FaUsers} />
                <DashboardAccordion Title="Reviews" AccordionComponent={ReviewsNav} Icon={FaRegCommentDots} />
            </AccordionGroup>
        </div>
    )
}

export default DashboardSidebar