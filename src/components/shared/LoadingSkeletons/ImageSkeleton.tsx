import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import { IImageSkeleton } from '../../../types/types';

function ImageSkeleton({ customClass }: IImageSkeleton) {
    return (
        <>
            <Skeleton className={`${customClass}`}
                sx={{ bgcolor: 'grey.900', width: "100%", aspectRatio: 1 / 1 }}
                variant="rectangular"

            />
        </>
    )
}

export default ImageSkeleton