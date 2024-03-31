import React, { createContext, useContext, useEffect, useState } from 'react'
import { IProduct } from '../../../types/types';
import useAxios from '../../customHooks/useAxios';
import { UserContext } from '../UserFeature/UserProvider';

export interface GlobalCachingContext {
    brands: any;
    setBrands: React.Dispatch<React.SetStateAction<any>>;
    isCategoriesLoading: boolean;
    isBrandsLoading: boolean;
    isProductByIdLoading: boolean;
    isRelatedProductLoading: boolean;
    isTopRatedProductsLoading: boolean;
    loadingMessage: boolean;
    isSingleOrderDetailsLoading:boolean;
    isInvoiceByOrderIdLoading:boolean;
    reviewsCount: number;
    product: IProduct | object;
    topRatedProducts: IProduct[];
    orders: any;
    singleOrderDetails: any;
    categories: any;
    invoice: any;
    relatedProducts: IProduct[];
    getSingleOrderDetails: (orderId: string) => Promise<void>;
    getBrands: () => Promise<void>;
    getCategories: () => Promise<void>;
    getInvoiceByOrderId :(orderId:string) => Promise<void>;
    getProductData: (page: string, limit: string, productId: string) => Promise<void>;
    getRelatedProducts: (categoryId: string, productId: string) => Promise<void>;
    getTopRatedProducts: () => Promise<void>;
    setLoadingMessage: React.Dispatch<React.SetStateAction<boolean>>;
    setOrders: React.Dispatch<React.SetStateAction<any>>;
    setSingleOrderDetails: React.Dispatch<React.SetStateAction<any>>;
    setIsProductByIdLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsTopRatedProductsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setRelatedProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
    setIsRelatedProductLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setInvoice: React.Dispatch<React.SetStateAction<any>>;
}


export const GlobalCachingContext = createContext<GlobalCachingContext>(null)

function GlobalCachingProvider({ children }) {
    const [brands, setBrands] = useState([])
    const { GET: GET_Brands, isLoading: isBrandsLoading } = useAxios(true)
    const [categories, setCategories] = useState([])
    const { GET: GET_Categories, isLoading: isCategoriesLoading } = useAxios();
    const { GET: GET_ProductById, isLoading: isProductByIdLoading, setIsLoading: setIsProductByIdLoading } = useAxios(false)
    const [reviewsCount, setReviewsCount] = useState(9);
    const [product, setProduct] = useState<IProduct | object>({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const { GET: GET_RelatedProducts, isLoading: isRelatedProductLoading, setIsLoading: setIsRelatedProductLoading } = useAxios(true)
    const { GET: GET_InvoiceByOrderId, isLoading: isInvoiceByOrderIdLoading, setIsLoading: setIsInvoiceByOrderIdLoading, } = useAxios(true)
    const [topRatedProducts, setTopRatedProducts] = useState<IProduct[] | []>([]);
    const { GET: GET_TopRatedProducts, isLoading: isTopRatedProductsLoading, setIsLoading: setIsTopRatedProductsLoading} = useAxios(true)
    const { GET: GET_SingleOrderDetails, isLoading: isSingleOrderDetailsLoading, setIsLoading: setIsSingleOrderDetailsLoading } = useAxios(false)
    const [singleOrderDetails, setSingleOrderDetails] = useState([]);
    const [orders, setOrders] = useState([])
    const { userToken } = useContext(UserContext);
    const [loadingMessage, setLoadingMessage] = useState(true);
    const [invoice, setInvoice] = useState({});

    const getBrands = async () => {
        try {
            const { data } = await GET_Brands("/brands")
            setBrands(data.brands)
        } catch (error) {
            console.log(error)
        }
    }

    const getSingleOrderDetails = async (orderId: string) => {
        try {
            setIsSingleOrderDetailsLoading(true);
            const { data } = await GET_SingleOrderDetails(`/orders/singleOrder/${orderId}`, userToken);
            setSingleOrderDetails(data.order);
        } catch (error) {
            console.log(error);
        }finally{
            setIsSingleOrderDetailsLoading(false);
        }
    }


    const getCategories = async () => {
        try {
            const { data } = await GET_Categories("/categories");
            setCategories(data.categories);
            setLoadingMessage(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getProductData = async (page = "1", limit = "9", productId: string) => {
        try {
            const { data } = await GET_ProductById(`/products/${productId}?page=${page}&limit=${limit}`);
            setProduct(data.product);
            setReviewsCount(data.count);
            console.log("sent product")
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
        try {
            const { data } = await GET_TopRatedProducts("/products?page=1&limit=7&sort=ratings_desc")
            setTopRatedProducts(data.products)
            console.log(data.products)
        } catch (error) {
            console.log(error)
        } finally {
            setIsTopRatedProductsLoading(false)
        }
    }

    const getInvoiceByOrderId = async (orderId:string)=>{
        try{
            setIsInvoiceByOrderIdLoading(true)
            const {data} = await GET_InvoiceByOrderId(`/invoices/${orderId}`,userToken);
            setInvoice(data.invoice);
        }catch(error){
            console.log(error)
        }finally{
            setIsInvoiceByOrderIdLoading(false)
        }
    }
    useEffect(() => {
        getCategories();

    }, [])




    return (
        <GlobalCachingContext.Provider value={{
            brands, setBrands, getBrands, isBrandsLoading,
            categories, product, reviewsCount, isProductByIdLoading,
            getProductData, setIsProductByIdLoading, getRelatedProducts, relatedProducts, setRelatedProducts,
            isRelatedProductLoading, setIsRelatedProductLoading, getTopRatedProducts, isTopRatedProductsLoading, setIsTopRatedProductsLoading,
            topRatedProducts, getCategories, isCategoriesLoading, orders, setOrders, singleOrderDetails, setSingleOrderDetails, getSingleOrderDetails,
            loadingMessage, setLoadingMessage,invoice,setInvoice,isInvoiceByOrderIdLoading,getInvoiceByOrderId ,isSingleOrderDetailsLoading
        }}>
            {children}
        </GlobalCachingContext.Provider>
    )
}

export default GlobalCachingProvider