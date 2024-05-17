import { useState, FC, useContext, Children, ReactNode } from 'react';
import Accordion from '@mui/joy/Accordion';
import AccordionSummary from '@mui/joy/AccordionSummary';
import { AccordionDetails } from '@mui/joy';
import { ThemeContext } from '../../../components/features/ThemeFeature/ThemeProvider';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { BiHome } from 'react-icons/bi';
import { useTheme, useMediaQuery } from '@mui/material';

export interface IDashboardAccordion {
    Title: string;
    Icon: FC | typeof BiHome;
    IconSize?: number | string;
    children:ReactNode;
}

function DashboardAccordion({children, Title, Icon, IconSize = 22 }: IDashboardAccordion) {
    const [index, setIndex] = useState<number | null>(0);
    const { theme } = useContext(ThemeContext);

    const MuiTheme = useTheme();
    const isLargeScreen = useMediaQuery(MuiTheme.breakpoints.up('md'));
    return (
        <Accordion
            expanded={index === 0}
            onChange={(event, expanded) => {
                setIndex(expanded ? 0 : null);
            }}

        >
            <AccordionSummary sx={{
                paddingLeft: "5px",
            }}
                slotProps={{
                    button: {
                        sx: {
                            paddingBlock: isLargeScreen ? "5px" : "2px",
                            paddingInline: isLargeScreen ? "" : "13px",
                            '&:hover': {
                                backgroundColor: theme === "light" ? "rgba(222, 222, 222,0.5) !important" : "rgba(33,33,33,0.5) !important",

                            },
                            '&:active': {
                                backgroundColor: 'inherit',
                            },

                        },
                        className: "justify-center"
                    },
                }}
                indicator={<div className='block'><KeyboardArrowDown sx={{
                    color: theme === "light" ? "var(--light--text--color)" : "var(--dark--text--color)",
                }} /></div>}

            >

                <div className="flex gap-x-2 items-center" style={{
                    color: theme === "light" ? "var(--light--text--color)" : "var(--dark--text--color)"
                }}>
                    <Icon size={IconSize} />
                    <h3 className='block py-0.5'>{Title}</h3>
                </div>
            </AccordionSummary>

            <div className='block'>
                <AccordionDetails>
                    <div style={{
                        color: theme === "light" ? "var(--light--text--color)" : "var(--dark--text--color)"
                    }}>
                        {children}
                    </div>
                </AccordionDetails>
            </div>
        </Accordion>
    )
}

export default DashboardAccordion