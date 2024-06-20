import React from 'react'

export default function Loading(props) {
  return (
    <div className="mt-4 overflow-y-auto max-h-[300px]  px-4 m-2 ">
       {props.message}
    </div> 
  )
}
