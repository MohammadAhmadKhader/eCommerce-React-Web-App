import { useContext } from 'react'
import Skeleton from '@mui/material/Skeleton';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import { IOneLineSkeleton } from '../../../types/types';

function OneLineSkeleton({forceMinWidth,forceMinHeight} : IOneLineSkeleton) {
    const {theme} = useContext(ThemeContext)

  return (
    <>
        <Skeleton sx={{
                bgcolor: theme == "dark" ? "var(--dark--bgCard-color)" : "var(--light--bgCard-color)",
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                width:forceMinWidth ? forceMinWidth : "auto",
                height:forceMinHeight ? forceMinHeight : "auto",
        }}/>
        
    </>
  )
}

export default OneLineSkeleton