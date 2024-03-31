import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import { IoPersonAdd } from "react-icons/io5";
import { UserContext } from '../../features/UserFeature/UserProvider';
import HeartIcon from '../../shared/HeartIcon';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdLogin } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import Preferences from './Preferences';
import LogoutButton from '../../profile/ProfileComponents/LogoutButton';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { GoChecklist } from "react-icons/go";
import { BiCommentDots } from "react-icons/bi";
import Collapse from '@mui/material/Collapse';
import ListItemDrawer from './ListItemDrawer';
import ShortWebSiteLogo from '../../shared/ShortWebSiteLogo';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { WindowWidthContext } from '../../features/WindowWidthFeature/WindowWidthProvider';
import OneLineSkeleton from '../../shared/LoadingSkeletons/OneLineSkeleton';


export default function MenuDrawer({ isOpen, setIsOpen }) {
    const toggleDrawer = (newOpen: boolean) => () => {
        setIsOpen(newOpen);
    };
    const { theme } = useContext(ThemeContext);
    const { userToken, userData, isUserFetchDataLoading } = useContext(UserContext);
    const [isPreferenceListOpen, setIsPreferenceListOpen] = useState(false);

    const DrawerList = (
        <Box sx={{
            minHeight: "100%",
            width: 250,
            backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
            color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",

        }} role="presentation">

            <List className='py-[15px!important]'>
                <ListItem disablePadding className='flex items-center justify-between ps-4' onClick={toggleDrawer(false)}>
                    <Link to="/" >
                        <ShortWebSiteLogo windowWidth={"100px"} />
                    </Link>
                    <FiChevronLeft size={30}
                        className={`rounded-md duration-300  ms-auto me-5 mb-1.5
                        ${theme == "dark" ? "hover:bg-[rgba(255,255,255,0.1)]"
                                : "hover:bg-[rgba(0,0,0,0.05)]"} hover:cursor-pointer`}
                        onClick={toggleDrawer(false)}
                    />
                </ListItem>
                {(userToken != null || userData != null) && !isUserFetchDataLoading && !isUserFetchDataLoading ?

                    <>
                        <ListItemDrawer Title='Profile' IconComponent={CgProfile} To={'/profile/information'} onClick={toggleDrawer(false)}/>
                        <ListItemDrawer Title='Orders' IconComponent={GoChecklist} To={"/profile/orders?status=Completed&page=1&limit=9"}  onClick={toggleDrawer(false)}/>
                        <ListItemDrawer Title='Reviews' IconComponent={BiCommentDots} To={"/profile/reviews?page=1&limit=9"}  onClick={toggleDrawer(false)}/>

                        <ListItem disablePadding onClick={toggleDrawer(false)}
                            sx={{
                                transition: "300ms",
                                ':hover': {
                                    backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                                }
                            }}>

                            <ListItemButton title="wishlist" className='p-[0!important]'>
                                <Tooltip className='w-full' title="Wishlist">
                                    <Link className='flex items-center w-full font-semibold tracking-wide px-4 py-2' to="/profile/wishlist">
                                        <HeartIcon customClasses='opacity-[1!important]' height={25} width={25} />
                                        <span className='ms-4'>
                                            Wishlist
                                        </span>
                                    </Link>
                                </Tooltip>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding
                            sx={{
                                transition: "300ms",
                                ':hover': {
                                    backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                                }
                            }}><ListItemButton className='p-[0!important]' onClick={toggleDrawer(false)}>
                                <Tooltip className='w-full' title="Logout">
                                    <span className='w-full'>
                                        <LogoutButton size={25} rebuildClasses={true} customClasses={'flex items-center gap-x-4 w-full font-semibold tracking-wide px-4 py-2'} />
                                    </span>
                                </Tooltip>
                            </ListItemButton>
                        </ListItem>
                    </> : isUserFetchDataLoading && <div className="flex flex-col justify-center items-center gap-y-4">
                        <OneLineSkeleton forceMinHeight={"20px"} forceMinWidth={"200px"} />
                        <OneLineSkeleton forceMinHeight={"20px"} forceMinWidth={"200px"} />
                        <OneLineSkeleton forceMinHeight={"20px"} forceMinWidth={"200px"} />
                        <OneLineSkeleton forceMinHeight={"20px"} forceMinWidth={"200px"} />
                    </div>
                }
                {(userToken == null || userData == null || isUserFetchDataLoading) && isUserFetchDataLoading ?
                    <div className="flex flex-col justify-center items-center gap-y-4 mt-4">
                        <OneLineSkeleton forceMinHeight={"20px"} forceMinWidth={"200px"} />
                        <OneLineSkeleton forceMinHeight={"20px"} forceMinWidth={"200px"} />
                    </div> : !userData && !userToken && <>
                        <ListItemDrawer Title='Sign In' IconComponent={MdLogin} To={"/login"} onClick={toggleDrawer(false)}/>
                        <ListItemDrawer Title='Sign Up' IconComponent={IoPersonAdd} To={"/signup"} onClick={toggleDrawer(false)}/>
                    </>
                }

                <ListItem disablePadding sx={{
                    transition: "300ms",
                    ':hover': {
                        backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                    }
                }}>
                    <div className='flex flex-col w-full'>
                        <ListItemButton title='Preferences section' onClick={() => { setIsPreferenceListOpen(prevState => !prevState) }}>
                            <Tooltip className='w-full' title="Preferences">
                                <div className='flex items-center justify-between'>
                                    <span className='font-semibold'>Preferences</span>
                                    <FiChevronRight size={22} className={`duration-300 ${isPreferenceListOpen ? "rotate-90" : ""}`} />
                                </div>
                            </Tooltip>
                        </ListItemButton>
                        <Collapse className='ps-5 pe-4' in={isPreferenceListOpen}>
                            <Preferences />
                        </Collapse>
                    </div>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div className='flex items-center justify-center'>
            <button className='mx-2' onClick={toggleDrawer(true)}>
                <BiDotsVerticalRounded size={30} className='-ms-2.5' />
            </button>
            <Drawer open={isOpen} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}