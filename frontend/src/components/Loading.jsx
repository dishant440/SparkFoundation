import React from 'react'

export default function Loading(props) {
  return (
    <div className="mt-4 overflow-y-auto max-h-[300px] w-full px-4 m-2 shadow-inner">
        {props.text}
    </div> 
  )
}
