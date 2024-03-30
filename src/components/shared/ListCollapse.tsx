import { ComponentType, FC, ReactNode, useContext, useState } from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import { FaChevronRight } from 'react-icons/fa6';
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider';

export interface IListCollapse { 
    Title: string,
     CustomComponent: ComponentType,
     ChevronSize?: string | number,
     CustomSxStyles?:object,
     TitleClasses?:string
     ,DisableRipple?:boolean,
     CustomListButtonStyle?:object | undefined 
}


function ListCollapse({ 
    Title, CustomComponent,ChevronSize = 20,
    CustomSxStyles={},TitleClasses = "text-2xl py-1",
    DisableRipple=true,CustomListButtonStyle=undefined 
    }: IListCollapse) {
    const { theme } = useContext(ThemeContext)
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <List
                sx={{
                    ...CustomSxStyles
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                style={{
                    backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
                    color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
                }}>

                <ListItemButton onClick={handleClick}
                    disableRipple={DisableRipple}
                    sx={CustomListButtonStyle ? CustomListButtonStyle : {
                        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                        borderBottomWidth: "1px",
                        borderStyle: "solid",
                        paddingInline: "0px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        '&:hover': {
                            backgroundColor: 'transparent'
                        },
                        
                    }}>

                    <h3 className={`${TitleClasses}`}>{Title}</h3>
                    <div className={`duration-500 ${open ? "rotate-90" : "rotate-0"}`}>
                        <FaChevronRight size={ChevronSize} />
                    </div>

                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <CustomComponent />
                </Collapse>
            </List>
        </>
    )
}

export default ListCollapse