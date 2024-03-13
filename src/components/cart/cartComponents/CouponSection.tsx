import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import { FaChevronRight } from 'react-icons/fa';


function CouponSection() {
    const { theme } = useContext(ThemeContext)
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div>
            <List
                sx={{}}
                component="nav"
                aria-labelledby="nested-list-subheader"
                style={{
                    backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
                    color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
                }}>


                <ListItemButton onClick={handleClick}
                    disableRipple
                    sx={{
                        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                        borderBottomWidth: "1px",
                        borderStyle: "solid",
                        paddingInline: "0px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        '&:hover': {
                            backgroundColor: 'transparent'
                        }
                    }}

                >

                    <h3 className='text-2xl py-1'>Apply Coupon Code</h3>
                    <div className={`duration-500 ${open ? "rotate-90" : "rotate-0"}`}>
                        <FaChevronRight size={20} />
                    </div>

                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <div className='rounded-md flex border-color-accent border w-fit my-5'>
                        <input placeholder='Apply Coupon Code' type="text" className='px-2 bg-transparent border-none outline-none py-2' />
                        <button className='text-color-accent border-color-accent border-l py-2 px-2 hover:bg-color-accent hover:text-white duration-300 font-semibold'>CHECK</button>
                    </div>
                </Collapse>
            </List>
        </div >
    )
}

export default CouponSection