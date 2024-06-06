import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import ReviewComponent from './ReviewComponent';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./singleProductTabs.css"
import RelatedProductsCarousel from './RelatedProductsCarousel';
import { ISingleProductTabs, Review } from '../../../types/types';
import LongTextSkeleton from '../../shared/LoadingSkeletons/LongTextSkeleton';
import { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import SubmitReview from './SubmitReview';
import EditReviewModal from './EditReviewModal';
import { UserContext } from '../../features/UserFeature/UserProvider';

export default function SingleProductTabs({ product, isProductByIdLoading, reviewsCount, reviewsLimit }: ISingleProductTabs) {
    const { theme } = useContext(ThemeContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isEditReviewModalOpen, setIsEditReviewModalOpen] = useState<boolean>(false);
    const [reviewId, setReviewId] = useState<undefined | string>(undefined);
    const [review, setReview] = useState<undefined | Review>(undefined);
    const { userData } = useContext(UserContext);
    const params = useParams()

    useEffect(() => {
        if (userData && product && product.reviews && product.reviews.length != 0) {
            product.reviews.map((rev) => {
                if (rev.user._id == userData._id) {
                    setReviewId(rev._id);
                    setReview(rev);
                }
            })
        }
    }, [searchParams, product, params.productId, userData])
    return (
        <Tabs aria-label="Basic tabs"
            className={` bg-red-500 rounded-lg`}
            defaultValue={0} style={{
                backgroundColor: theme == "dark" ? "var(--dark--bgCard-color)" : "var(--light--bgCard-color)",
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
            }}
            sx={{
                color: "inherit !important"
            }}
        >
            <TabList sx={{
                color: "inherit !important"
            }}>
                <Tab sx={{
                    color: "inherit !important",
                    transition: "400ms !important",
                    margin: "4px",
                    borderRadius: "10px",
                    '&:hover, &[aria-selected="true"]': {
                        backgroundColor: 'var(--accent-color) !important',
                        color: "white !important"
                    },

                }}

                    disableIndicator>Products Description</Tab>
                <Tab sx={{
                    color: "inherit !important",
                    transition: "400ms !important",
                    margin: "4px",
                    borderRadius: "10px",
                    '&:hover, &[aria-selected="true"]': {
                        backgroundColor: 'var(--accent-color) !important',
                        color: "white !important"
                    },


                }}

                    disableIndicator>Related Products</Tab>
                <Tab sx={{
                    color: "inherit !important",
                    transition: "400ms !important",
                    margin: "4px",
                    borderRadius: "10px",
                    '&:hover, &[aria-selected="true"]': {
                        backgroundColor: 'var(--accent-color) !important',
                        color: "white !important"
                    },
                }}

                    disableIndicator>Ratings and Reviews</Tab>
            </TabList>
            <TabPanel sx={{ color: "inherit !important" }}>
                {isProductByIdLoading ? <LongTextSkeleton /> : product.description}
            </TabPanel>
            <TabPanel value={1} sx={{ color: "inherit !important" }}>
                <h3 className='ps-2 text-2xl text-left font-semibold'>You may also like :</h3>
                <RelatedProductsCarousel categoryId={isProductByIdLoading ? "" : product.categoryId} />
            </TabPanel>
            <TabPanel value={2} sx={{ color: "inherit !important" }}>
                <div className='flex flex-col'>
                    <div className='flex flex-col gap-y-4 my-4'>
                        <h3 className='text-2xl font-semibold'>Add Review</h3>
                        <SubmitReview />
                        <EditReviewModal review={userData ? review : undefined} isEditReviewModalOpen={isEditReviewModalOpen} setIsEditReviewModalOpen={setIsEditReviewModalOpen} />
                    </div>
                    <div className='border-t mt-18' style={{
                        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                    }}>
                        <h3 className='text-2xl my-3'>Reviews : </h3>
                        <div className='flex flex-col gap-y-5'>
                            {product?.reviews?.map((rev) => {
                                return (
                                    <ReviewComponent mode="public" review={rev} key={rev._id}
                                        setEditModal={setIsEditReviewModalOpen} />
                                )
                            })}

                        </div>


                        {product?.reviews?.length > 0 ? <div className='flex justify-center'>
                            <Stack spacing={2} sx={{
                                maxWidth: "fit-content",
                                marginBlock: "10px",
                            }}
                                className='bg-color-accent rounded-md'
                            >
                                <Pagination sx={{
                                    color: "white !important;"
                                }}
                                    count={Math.ceil(reviewsCount / reviewsLimit)} onChange={(event, value) => {
                                        if (Number(searchParams.get("page")) <= Number(Math.ceil(reviewsCount / reviewsLimit))) {
                                            searchParams.set("page", value.toString())
                                            setSearchParams(searchParams);
                                        }
                                    }}
                                />
                            </Stack>
                        </div> : <h4 className='text-center w-full my-5 font-semibold tracking-wide'>Product was not reviewed yet..</h4>}

                    </div>
                </div>
            </TabPanel>
        </Tabs>
    );
}