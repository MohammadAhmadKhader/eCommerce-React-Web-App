import { useContext, useState } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import { FaChevronRight } from 'react-icons/fa';

function ContactInformation() {
    const { theme } = useContext(ThemeContext)
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
  return (
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
                }}>
                <h3 className='text-2xl py-1'>Add New Address</h3>
                <div className={`duration-500 ${open ? "rotate-90" : "rotate-0"}`}>
                    <FaChevronRight size={20} />
                </div>
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                
            </Collapse>
    </List>
    
  )
}

export default ContactInformation