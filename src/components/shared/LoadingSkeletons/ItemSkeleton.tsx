import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';

export interface IItemSkeleton {
    widthImg?:string |number;
    heightImg?:string | number;
    widthTextFirstRectangular?:string|number;
    widthTextSecondRectangular?:string|number;
    imgHolderVariant?: "circular" | "rectangular";
}

export default function ItemSkeleton({widthImg = 75,heightImg =80,widthTextFirstRectangular=200,widthTextSecondRectangular=140,imgHolderVariant = "circular"} : IItemSkeleton) {
  return (
    <div>
      <Box sx={{ m: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
        <Skeleton variant={`${imgHolderVariant}`} width={widthImg} height={heightImg} />
        <div>
          <Skeleton variant="rectangular" width={widthTextFirstRectangular} height="1em" sx={{ mb: 1 }} />
          <Skeleton variant="rectangular" width={widthTextSecondRectangular} height="1em" />
        </div>
      </Box>
    </div>
  );
}