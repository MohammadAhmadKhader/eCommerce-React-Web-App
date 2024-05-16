import  { useContext, useEffect } from 'react'
import TableLayout from '../dashboardShared/TableLayout'
import { GlobalCachingContext } from '../../../components/features/GlobalCachingContext/GlobalCachingProvider'
import BrandsTable from './BrandsTable';

function DashboardBrands() {
  const {brands, isBrandsLoading,getBrands} = useContext(GlobalCachingContext);
  
  useEffect(()=>{
    getBrands()
  },[])

  return (
    <TableLayout count={brands?.length} title={"Brands"}>
      <div className='my-5'>
        <BrandsTable brands={brands} count={brands?.length} isLoading={isBrandsLoading} />
      </div>
    </TableLayout>
    
  )
}

export default DashboardBrands