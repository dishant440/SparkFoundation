import React from 'react';
import Button from './Button';

export default function AllAccount({ number, name, email, onClick,balance }) {
  return (
    <div className="bg-white shadow-md w-full h-12 p-2 mt-2" onClick={onClick}>
      <div className="flex flex-row gap-x-10 justify-between font-semibold items-center">
        <span className="ml-2">{number}</span>
        <span className="flex-1 text-center">{name}</span>
        <span className="flex-1 text-center">{email}</span>
        <span>Rs {balance}</span>
      </div>
    </div>
  );
}
