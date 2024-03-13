import ReviewComponent from '../../singleProduct/SingleProductPageComponents/ReviewComponent'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useContext, useState } from 'react';
import "./MyReviews.css"
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';

function MyReviews() {
  const [page, setPage] = useState(1)
  const { theme } = useContext(ThemeContext)
  return (
    <div className='MyReviews flex flex-col gap-y-4'>
      <div className='border-b' style={{
        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
      }}>
        <h4 className='text-2xl py-2'>
          My Reviews
        </h4>
      </div>
      <ReviewComponent />
      <ReviewComponent />
      <ReviewComponent />
      <ReviewComponent />
      <ReviewComponent />
      <ReviewComponent />

      <Stack spacing={2} sx={{
        maxWidth: "fit-content",
        marginBlock: "10px",
        marginInline: "auto"
      }}
        className='bg-color-accent rounded-md'
      >
        <Pagination sx={{
          color: "white !important;"
        }}
          count={10} onClick={(e) => {
            const buttonText = (e.target as Element)?.closest("li")?.querySelector("button")?.textContent
            if(buttonText){
              setPage(parseInt(buttonText));
            }
          }}
        />
      </Stack>
    </div>
  )
}

export default MyReviews