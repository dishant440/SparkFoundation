import React from 'react'
import Button from './Button'

export default function AllAccount(props) {
  return (
    <div className="bg-white shadow-md w-full h-12 p-2 mt-2">
        <div className="flex flex-row gap-x-10 justify-center ">
                <span>1.</span>
                <span>Dishant Nalwaya</span>
                <span>dishantnalwaya@gmail.com</span>
                <Button 
                classname = "bg-red-500 px-4 py-1"
                text="Send"
                />

        </div>
    </div>
  )
}
