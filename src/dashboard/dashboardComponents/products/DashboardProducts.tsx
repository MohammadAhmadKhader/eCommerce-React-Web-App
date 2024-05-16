import { useEffect, useState } from 'react'
import TableLayout from '../dashboardShared/TableLayout'
import ProductsTable from './ProductsTable'
import useAxios from '../../../customHooks/useAxios';
import { IProduct } from '../../../types/types';
import { useSearchParams } from 'react-router-dom';

function DashboardProducts() {
  const { GET, isLoading, setIsLoading } = useAxios();
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getAllProducts(searchParams.get("page"), searchParams.get("limit"));
  }, [searchParams]);

  const getAllProducts = async (page, limit) => {
    try {
      const { data } = await GET(`/products?page=${page}&limit=${limit}`);

      setProducts(data.products);
      setCount(data.count);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TableLayout count={count} title={"Products"}>
      <div className='my-5'>
        <ProductsTable count={count} products={products} isLoading={isLoading} getAllProducts={getAllProducts} />
      </div>
    </TableLayout>

  )
}

export default DashboardProducts