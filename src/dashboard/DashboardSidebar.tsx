import DashboardAccordion from "./dashboardComponents/dashboardShared/DashboardAccordion"
import AccordionGroup from '@mui/joy/AccordionGroup';
import { useContext } from "react";
import { ThemeContext } from "../components/features/ThemeFeature/ThemeProvider";
import { FaRegCommentDots, FaUsers } from "react-icons/fa";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { BsBoxSeam } from "react-icons/bs";
import { LuFileBox } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import SidebarNavElement from "./dashboardComponents/dashboardShared/SidebarNav";

function DashboardSidebar({ removeDefaultStyles = false, className }: { removeDefaultStyles?: boolean; className?: string }) {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`${removeDefaultStyles ? "" : "min-h-screen border-r-[3px]"} ${className}`} style={{
            borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
        }}>
            <AccordionGroup sx={{ paddingInline: "0px" }}>
                <DashboardAccordion Title="Categories"
                    Icon={MdOutlineCategory} >
                    <SidebarNavElement
                    linksArray={[
                        { text: "Categories", to: "/dashboard/categories" },
                        { text: "Create Category", to: "/dashboard/categories/create" }
                    ]}/>
                </DashboardAccordion>
                <DashboardAccordion Title="Brands" Icon={SiBrandfolder} >
                    <SidebarNavElement
                    linksArray={[
                        { text: "Brands", to: "/dashboard/brands?page=1&limit=9" },
                        { text: "Create Brand", to: "/dashboard/brands/create" }
                    ]}/>
                </DashboardAccordion>
                <DashboardAccordion Title="Products" Icon={BsBoxSeam} >
                <SidebarNavElement
                    linksArray={[
                        { text: "Products", to: "/dashboard/products?page=1&limit=20" },
                        { text: "Create Product", to: "/dashboard/products/create" }
                    ]}/>
                </DashboardAccordion>
                <DashboardAccordion Title="Orders" Icon={LuFileBox} >
                    <SidebarNavElement
                        linksArray={[{ text: "Orders", to: "/dashboard/orders?page=1&limit=20" }]}
                    />
                </DashboardAccordion>
                <DashboardAccordion Title="Invoices" Icon={LiaFileInvoiceSolid} >
                    <SidebarNavElement
                        linksArray={[
                        { text: "Invoices", to: "/dashboard/invoices?page=1&limit=20" }, 
                    ]}/>
                </DashboardAccordion>
                <DashboardAccordion Title="Users" Icon={FaUsers} >
                    <SidebarNavElement
                        linksArray={[
                        { text: "Users", to: "/dashboard/users?page=1&limit=20" }, 
                        { text: "Create User", to: "/dashboard/users/create" }
                    ]}/>
                    
                </DashboardAccordion>
                <DashboardAccordion Title="Reviews" Icon={FaRegCommentDots} >
                    <SidebarNavElement
                        linksArray={[
                        { text: "Reviews", to: "/dashboard/reviews?page=1&limit=20" },
                    ]}/>
                </DashboardAccordion>
            </AccordionGroup>
        </div>
    )
}

export default DashboardSidebar