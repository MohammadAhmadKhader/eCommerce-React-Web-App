import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function CircularLoader({minHeight }:{minHeight : string | number }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: "center",alignItems:"center",minHeight:minHeight,width:"100%" }}>
        <CircularProgress />
    </Box>
  )
}

export default CircularLoader