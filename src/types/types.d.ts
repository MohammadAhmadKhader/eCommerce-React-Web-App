import { ChangeEvent } from "react";
import { UseFormRegister, UseFormTrigger } from "react-hook-form";

export interface ICheckboxInputProps {
    id: string;
    text: string;
    handleCheckBox: (event:ChangeEvent,text:string)=>void;
    stateController:(text:string)=>boolean
}

export interface IChangePasswordForm {
    ReBuildFormClasses?:string;
    UseTitle?:boolean;
}

export interface ICheckoutProcessStepper {
    NextStep:string;
}

export interface IOrderSummaryItem {
    customClasses?:string;
}

export interface IThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

export interface IWindowWidthContextType {
    windowWidth: number;
}

export interface IFooterContactsLinksProps {
    LogoComponent: IconType;
    Href?: string;
    Size?: number | string;
}

export interface IFooterNavLinkComponentsProps {
    Href: string;
    text: string;
}

export interface ISingleHandPickedCollection {
    title: string;
    img: string;
    to:string
}

export interface ISearchIcon {
    IdName:string;
}

export interface IFiltersComponent {
    customClasses?: string;
}

export interface IFiltersListProps {
    FilterComponent: React.FC;
    title: string;
}

export interface IPriceComponent {
    finalPrice: number | string;
    price: number | string;
    offer: number ;
    customClassesNotOffer?:string;
    customClassesOffer?:string;
    customClassesOfferFinalPrice?:string;
}

export interface IImageSkeleton {
    customClass?:string;
}


export interface IProductWithRatingsCardProps {
    _id:string;
    name: string;
    finalPrice: number;
    price: number;
    offer: number;
    imageUrl: string;
    avgRating:number;
    description?:string;
    categoryId?:string;
    quantity:number;
    brand:string,
    ratingNumbers:number;
}

export interface IOneLineSkeleton {
    forceMinWidth?:number | string;
    forceMinHeight?:number | string;
  }
  

export type addReview ={
    comment?: string;
    rating?: number;
}

export type Review = {
    comment: string;
    rating: number;
    user:any;
    _id:string;
    createdAt:string;
    updatedAt:string;
}

export type User = {
    birthdate:string | null;
    email:string;
    firstName:string;
    lastName:string;
    mobileNumber:string;
    role:"user" | "admin";
    userImg:string;
    _id:string;
    updatedAt:string;
    createdAt:string;
    wishList:WishlistItem[]
    cart:CartItem[]
}

interface IWishlistItem {
    productId: IProduct;
    _id: string;
}

export type CartItem = {
    _id:string;
    quantity:number;
    productId:string;
}

// This will be removed soon
export type CartItemTemp = {
    _id:string;
    cart:[{
        quantity:number;
        productId:IProduct[]
    }]
}

export type OrderItem = {
    _id:string;
}

export type WishListItem = {
    _id:string;
    productId:string;
}

export interface IProduct {
    _id:string;
    name: string;
    finalPrice: number;
    price: number;
    offer: number;
    avgRating:number;
    description?:string;
    categoryId:string;
    quantity:number;
    images:ProductImages[];
    brand:string;
    createdAt:string;
    updatedAt:string;
    reviewsCount:number; 
    reviews?:Review[]
    ratingNumbers:number;
}

export interface IResponsiveSortFilterControl {
    SortComponent: FC;
    FilterComponent: FC;
    isResponsiveFilterActive: boolean;
    setIsResponsiveFilterActive: Dispatch<SetStateAction<boolean>>;
    isResponsiveSortActive: boolean;
    setIsResponsiveSortActive: Dispatch<SetStateAction<boolean>>;
  
}

export interface ISortComponent {
    customClasses?: string;
}

export interface IMyOrdersItem {
    OrderID: string;
    Date: string;
    Price: number;
    Status: "Paid" | "Pending" | "Cancelled";
}

export interface ILogoutButton {
    customClasses?:string;
    isHidden?:boolean;
    isCentered?:boolean;
}

export interface IProfileAsideOptions {
    CustomComponent?: FC<ILogoutButton>;
}

export interface IProfileNavLinkComponents {
    title: string;
    href: string;
}

export interface IResponsiveNavLinkComponentProps {
    IconComponent: IconType;
    Text: string;
    Size?: number | string;
    Href?: string;
}

export interface IHeartIconProps {
    width?: number;
    height?: number;
    fill?: string;
    strokeWidth?: number;
    customClasses?:string;
    respectTheme?:boolean;
    stroke?:string;
}

export interface IInputProps {
    type: string;
    id: string;
    name: string;
    title: string;
    placeholder: string;
    parentCustomClass?: string ;
    errors?:FormErrors;
    minDate?: string | number | undefined;
    maxDate?: string | number | undefined;
    trigger?: UseFormTrigger<T>;
    register: UseFormRegister<T>;
}

export interface IStarsComponent {
    size?:number | string;
}

export interface ISingleProduct {
    Img: string;
    Description: string;
    Title: string;
    CustomStyles?: object;
    CustomStylesImg?: object;
    Price:number;
}

export interface ICartTableItem {
    imgUrl:string;
    name:string;
    price:number;
    quantity:number;
    productId:string;
    brand:string;
    cartItemId:string;
}

export interface ISendAxiosRequest {
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    body?: object;
    token?: string;
    params?:object
}

export interface ISingleProductCarousel {
    images:ProductImages[];
}

export interface ISingleProductTabs {
    product:IProduct;
    isProductByIdLoading:boolean;
    reviewsCount:number;
    reviewsLimit:number;
}

export type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    birthDate: Date;
    userImg:BinaryType
}



export type UserSignInDataType = {
    email?: string;
    password?: string;
}

export type Address = {
    street?: string;
    state?: string;
    pinCode?: string;
    city?: string;
    fullName?: string;
    mobileNumber?: string;
}

export type ProductImages = {
    imageUrl: string;
    thumbnailUrl: string;
    _id: string;
};

export type UserChangePassword = {
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
}

export type FormErrors = {
    [key: string]: {
      message?: string;
    }
}

export type UserSigUpDataType = {
    email?: string;
    firstName?: string;
    lastName?:string;
    password?: string;
}

export type ContactUsMessage = {
    firstName: string;
    email: string;
    message: string;
}

export type ResetPasswordForm = {
    newPassword?:string;
    confirmedNewPassword?:string;
}

export type UserForgotPassword = {
    email?:string;
}