import React, { ReactNode, useEffect } from 'react'
import PaginationComponent from '../../../components/shared/PaginationComponent'
import { useTheme, useMediaQuery } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

function TableLayout({children,count,title}:{children:ReactNode;count:number;title:string;}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const MuiTheme = useTheme();
    const isSmallScreen = useMediaQuery(MuiTheme.breakpoints.down('md'));
    useEffect(() => {
        if (!searchParams.get("limit") || !searchParams.get("page")) {
            searchParams.set("limit", "9");
            searchParams.set("page", "1");
            setSearchParams(searchParams)
        }
    }, []);

  return (
    <div className='px-2 py-5 lg:p-5 min-h-[800px] flex flex-col overflow-hidden'>
        <h2 className='font-semibold text-3xl'>{title}</h2>
            
            {children}
            
        <div className='flex justify-center mt-auto'>
            <PaginationComponent count={count} customClasses='text-[white!important]' siblingCount={isSmallScreen ? -1 : 1} />
        </div>
    </div>
  )
}

export default TableLayout