import { CircularProgress } from '@mui/joy'
import React from 'react'

function ButtonLoader() {
  return (
    <>
        <CircularProgress sx={{ "--CircularProgress-size": "16px", "--CircularProgress-trackThickness": "2px", "--CircularProgress-progressThickness": "2px", "--CircularProgress-progressColor": "white", "--CircularProgress-trackColor": "black" }} size="sm" />
    </>
  )
}

export default ButtonLoader