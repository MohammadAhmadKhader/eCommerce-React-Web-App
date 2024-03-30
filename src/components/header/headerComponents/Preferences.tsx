import React, { useContext } from 'react'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import ListItemButton from '@mui/material/ListItemButton';

function Preferences() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div className="flex items-center min-w-max mx-3 font-semibold tracking-wide">
            <ListItemButton disableGutters className="rounded-md " onClick={toggleTheme}>
                {
                    theme == "dark" ?
                        <Tooltip title="Switch To Light Mode">
                            <div className='flex gap-x-2'>
                                <span>
                                    <MdDarkMode size={25} />
                                </span>
                                <span>
                                    Dark Mode
                                </span>
                            </div>
                        </Tooltip>
                        :
                        <Tooltip title="Switch To Dark Mode">
                            <div className='flex gap-x-2'>
                                <span>
                                    <MdLightMode size={25} />
                                </span>
                                <span>
                                    Light Mode
                                </span>
                            </div>
                        </Tooltip>
                }
            </ListItemButton>
        </div>
    )
}

export default Preferences