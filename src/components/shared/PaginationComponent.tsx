import React, { useContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PaginationComponent({count,customClasses} : {count : number,customClasses?:string}) {
    const [searchParams,setSearchParams] = useSearchParams();
    const {theme} = useContext(ThemeContext);
  return (
    <Stack spacing={2} sx={{
        bgcolor: theme === "dark" ? "var(--light--bgCard--color)" : "var(--dark--bgCard--color)",
        maxWidth: "fit-content",
        marginBlock: "10px",
    }}
        style={{
            boxShadow: theme == "dark" ? "var(--dark--boxShadowCard)" : "var(--light--boxShadowCard)",
            backgroundColor: "var(--accent-color)",
        }}
        className={`rounded-xl ${customClasses}`}
    >
        <Pagination count={Math.ceil(count / parseInt(searchParams.get("limit")))}
            onChange={(event, value) => {
                if (Number(searchParams.get("page")) <= Number(Math.ceil(count / parseInt(searchParams.get("limit"))))) {
                    searchParams.set("page", value.toString())
                    setSearchParams(searchParams);
                }
            }}
        />
    </Stack>
  )
}

export default PaginationComponent