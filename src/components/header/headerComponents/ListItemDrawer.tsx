import React, { ComponentType, ReactComponentElement, useContext } from 'react'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

export interface IListItemDrawer{
  IconComponent:any;
  IconSize?:number | string,
  To:string;
  Title:string;
}

function ListItemDrawer({IconComponent,IconSize = 25,To,Title} : IListItemDrawer) {
  const { theme } = useContext(ThemeContext);

  return (
    <ListItem disablePadding
            sx={{
                transition: "300ms",
                ':hover': {
                    backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                }
            }}><ListItemButton>
                <Tooltip className='w-full' title={Title}>
                    <Link className='flex items-center w-full font-semibold tracking-wide' to={To}>
                        <IconComponent size={IconSize} />
                        <span className='ms-4'>
                            {Title}
                        </span>
                    </Link>
                </Tooltip>
            </ListItemButton>
        </ListItem>
  )
}

export default ListItemDrawer