import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ThemeContext } from '../../../components/features/ThemeFeature/ThemeProvider';
import { Divider } from '@mui/joy';

interface IContextMenu {
    isContextMenuOpen: null | HTMLElement;
    setIsContextMenuOpen: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
    x: number;
    y: number;
    menuList?: {
        onClick: (event?: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
        text: string;
    }[],
    width?: string | number;
    header: {
        fieldName: string | number,
        fieldValue: string | number
    }
}

export default function TableDataMenu({ isContextMenuOpen, setIsContextMenuOpen, x, y, menuList, width = "250px", header }: IContextMenu) {
    const { theme } = React.useContext(ThemeContext);
    return (
        <Menu
            id="table-data-options-menu"
            aria-labelledby="table-data-options-menu"
            open={Boolean(isContextMenuOpen)}
            onClose={() => setIsContextMenuOpen(null)}
            anchorEl={() => isContextMenuOpen}
            anchorReference='anchorPosition'
            anchorPosition={{
                left: x,
                top: y
            }}
            slotProps={{
                paper: {
                    className: "border-color-accent",
                    sx: {
                        backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
                        color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                        boxShadow: "none",
                        borderWidth: "1px",
                        borderStyle: "solid"
                    },
                }
            }}

        >
            <MenuItem disableRipple
                sx={{
                    minWidth: width,
                    '&:hover': {
                        backgroundColor: "inherit",
                    },
                    '&:active': {
                        backgroundColor: 'inherit',
                    },
                    cursor: "default"
                }}
            >
                <div className='flex items-center'>
                    <h5 className='font-semibold tracking-wide'>{header.fieldName} : </h5>
                    <p className='text-sm ms-1'>{header.fieldValue}</p>
                </div>
            </MenuItem>
            <Divider />
            {menuList.map(({ onClick, text }, index) => {
                return (
                    <MenuItem
                        sx={{
                            minWidth: width,
                            '&:hover': {
                                backgroundColor: theme === "light" ? "rgba(222, 222, 222,0.5) !important" : "rgba(33,33,33,0.5) !important",
                            },
                            '&:active': {
                                backgroundColor: 'inherit',
                            },
                        }}
                        key={index} onClick={(event) => {
                            onClick(event)
                            setIsContextMenuOpen(null)
                        }}>{text}</MenuItem>
                )
            })}
        </Menu>
    );
}