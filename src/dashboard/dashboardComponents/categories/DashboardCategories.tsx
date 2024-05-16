import React, { useContext } from 'react'
import TableLayout from '../dashboardShared/TableLayout'
import { GlobalCachingContext } from '../../../components/features/GlobalCachingContext/GlobalCachingProvider'
import CategoriesTable from './CategoriesTable';

function DashboardCategories() {
  const { categories, isCategoriesLoading } = useContext(GlobalCachingContext);
  return (
    <TableLayout count={categories?.length} title={"Categories"}>
      <div className='my-5'>
        <CategoriesTable categories={categories} count={categories?.length} isLoading={isCategoriesLoading} />
      </div>
    </TableLayout>
  )
}

export default DashboardCategories