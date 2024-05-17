import React from 'react'

function DashboardTitle({className,removeDefaultStyles=false}:{className?:string,removeDefaultStyles?:boolean}) {
  return (
    <h2 className={`${removeDefaultStyles ? "": "text-3xl font-bold tracking-wide"} ${className}`}>
        Dashboard
    </h2>
  )
}

export default DashboardTitle