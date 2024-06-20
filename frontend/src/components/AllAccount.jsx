import React from 'react'
import Button from './Button'

export default function AllAccount({number, name, email}) {
  return (
    <div className="bg-white shadow-md w-full h-12 p-2 mt-2" >
        <div className="flex flex-row gap-x-10 justify-between font-semibold ">
          
                <span>{number}</span>
                <span>{name}</span>
                <span>{email}</span>
                <Button 
                classname = "bg-red-500 px-4 py-1"
                text="Send"
                />

        </div>
    </div>
  )
}
