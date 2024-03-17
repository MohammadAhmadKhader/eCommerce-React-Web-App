import React, { createContext, useState } from 'react'
import { IProduct } from '../../../types/types';
import useAxios from '../../customHooks/useAxios';

export interface GlobalCachingContext {
    brands: any;
    setBrands: React.Dispatch<React.SetStateAction<any>>;
    isBrandsLoading: boolean;
    isProductByIdLoading: boolean;
    isRelatedProductLoading: boolean;
    isTopRatedProductsLoading:boolean;
    reviewsCount: number;
    product: IProduct | object;
    topRatedProducts:IProduct[];
    categories: any;
    relatedProducts: IProduct[];
    getBrands: () => Promise<void>;
    getProductData: (page: string, limit: string, productId: string) => Promise<void>;
    getRelatedProducts: (categoryId: string, productId: string) => Promise<void>;
    getTopRatedProducts:() => Promise<void>;
    setIsProductByIdLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsTopRatedProductsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setRelatedProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
    setIsRelatedProductLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalCachingContext = createContext<GlobalCachingContext>(null)

function GlobalCachingProvider({ children }) {
    const [brands, setBrands] = useState([])
    const { GET: GET_Brands, isLoading: isBrandsLoading } = useAxios(true)
    const [categories, setCategories] = useState([])
    const { GET: GET_Categories, isLoading: isCategoriesLoading } = useAxios();
    const { GET: GET_ProductById, isLoading: isProductByIdLoading, setIsLoading: setIsProductByIdLoading } = useAxios(true)
    const [reviewsCount, setReviewsCount] = useState(9);
    const [product, setProduct] = useState<IProduct | object>({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const { GET :GET_RelatedProducts, isLoading: isRelatedProductLoading, setIsLoading: setIsRelatedProductLoading } = useAxios(true)
    const [topRatedProducts, setTopRatedProducts] = useState<IProduct[] | []>([]);
    const { GET: GET_TopRatedProducts, isLoading: isTopRatedProductsLoading, setIsLoading: setIsTopRatedProductsLoading } = useAxios(true)
    
    const getBrands = async () => {
        try {
            const { data } = await GET_Brands("/brands")
            setBrands(data.brands)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategories = async () => {
        try {
            const { data } = await GET_Categories("//")
            setCategories(data.categories)
        } catch (error) {
            console.log(error)
        }
    }

    const getProductData = async (page = "1", limit = "9", productId: string) => {
        try {
            const { data } = await GET_ProductById(`/products/${productId}?page=${page}&limit=${limit}`);
            setProduct(data.product);
            setReviewsCount(data.count);
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsProductByIdLoading(false);
        }

    }

    const getRelatedProducts = async (categoryId: string, productId: string) => {
        try {
            const { data } = await GET_RelatedProducts(`/products?page=1&limit=9&category=${categoryId}`)
            //const removedCurrentProduct = data.products.filter((prod) => prod._id !== productId)
            setRelatedProducts(data.products)
            setIsRelatedProductLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getTopRatedProducts = async () => {
        try{
            const { data } = await GET_TopRatedProducts("/products?page=1&limit=7&sort=ratings_desc")
            setTopRatedProducts(data.products)
            console.log(data.products)
        }catch(error){
            console.log(error)
        }finally{
            setIsTopRatedProductsLoading(false)
        }
    }



    return (
        <GlobalCachingContext.Provider value={{
            brands, setBrands, getBrands, isBrandsLoading,
            categories, product, reviewsCount, isProductByIdLoading,
            getProductData, setIsProductByIdLoading, getRelatedProducts, relatedProducts, setRelatedProducts,
            isRelatedProductLoading, setIsRelatedProductLoading, getTopRatedProducts,isTopRatedProductsLoading,setIsTopRatedProductsLoading,
            topRatedProducts
        }}>
            {children}
        </GlobalCachingContext.Provider>
    )
}

export default GlobalCachingProvider