import React, { useState } from 'react'
import empContext from './EmpContext'

export default function EmpInfo({children}) {
   var [data,setData]=useState("")
   const updateData=(newData)=>{
           setData(newData)
   }
  return (
     <empContext.Provider value={{data,updateData}}>
          {children}
     </empContext.Provider>
  )
}
