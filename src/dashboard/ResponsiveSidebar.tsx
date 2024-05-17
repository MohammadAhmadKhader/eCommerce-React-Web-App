import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { CSSProperties, Dispatch, Fragment, ReactNode, SetStateAction, useContext, useState } from 'react';
import { ThemeContext } from '../components/features/ThemeFeature/ThemeProvider';


interface IResponsiveSidebar {
    children: ReactNode;
    drawerSide: "left" | "right" | "bottom" | "top";
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    slideStyles?: CSSProperties
}

export default function ResponsiveSidebar({ children, drawerSide, isOpen, setIsOpen, slideStyles }: IResponsiveSidebar) {
    const { theme } = useContext(ThemeContext);
    return (
        <SwipeableDrawer
            SlideProps={{
                style: {
                    borderRightWidth: "1px",
                    borderRightStyle: "solid",
                    width: "250px",
                    backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
                    color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                    borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                    height:"100%",
                    ...slideStyles
                }
            }}
            swipeAreaWidth={0}
            anchor={drawerSide}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(false)}
        >
            {children}

        </SwipeableDrawer>
    );
}