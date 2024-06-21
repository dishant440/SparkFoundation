import React, { useEffect } from "react";
import AppBar from "../components/AppBar";
import Button from "../components/Button";
import { useFetchInfo } from "../hooks/index";
import Loading from "../components/Loading";
import Error from "../components/Error";

// export default function Info() {
//   const { info, loading, error } = useFetchInfo("6673e7ed67142badf955ac76");
//   if (loading) {
//     return <Loading />;
//   }
//   if (error) {
//     return(
//         <Error/>
//     )
// }

// console.log("data \n");
// console.log(info);


//   return (
//     <div>
//       <AppBar />
//       <div className="w-[500px] h-[200px] bg-gray-700 shadow-lg flex m-auto mt-10 text-white">
//         <div className="flex flex-col justify-center items-center m-auto">
//           {info && info.map((informations) => (
//             <>
//               <span>Name : {informations.name} </span>
//               <span>Email : {informations.email} </span>
//               <span>Balance : {informations.balance} </span>
//             </>
//           ))}
//           <Button classname="bg-blue-500 mt-2 p-1" text="Send Money" />
//         </div>
//       </div>
//     </div>
//   );
// }


export default function Info() {
    const { info, loading, error } = useFetchInfo("6673e7ed67142badf955ac76");
  
    if (loading) {
      return <Loading />;
    }
  
    if (error) {
      return <Error />;
    }
  
    console.log("data");
    console.log(info);
  
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