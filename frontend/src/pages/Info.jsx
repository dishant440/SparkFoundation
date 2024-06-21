import React from "react";
import AppBar from "../components/AppBar";
import Button from "../components/Button";
import { useFetchInfo } from "../hooks/index";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useParams } from "react-router-dom";


export default function Info() {
    const {id} = useParams()
    const { info, loading, error } = useFetchInfo(id);
  
    if (loading) {
      return <Loading />;
    }
  
    if (error) {
      return <Error />;
    }
  
    
  
    return (
      <div>
        <AppBar />
        <div className="w-[500px] h-[200px] bg-gray-700 shadow-lg flex m-auto mt-10 text-white">
          <div className="flex flex-col justify-center items-center m-auto gap-y-2">
            {info && (
              <>
                <span>Name: {info.name}</span>
                <span>Email: {info.email}</span>
                <span>Balance: {info.balance}</span>
              </>
            )}
            <Button classname="bg-blue-500 mt-2 p-1" text="Send Money" />
          </div>
        </div>
      </div>
    );
  }