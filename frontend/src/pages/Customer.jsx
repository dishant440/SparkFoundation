import React from "react";
import AllAccount from "../components/AllAccount";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { useFetchCustomer } from "../hooks/index";
import { useNavigate } from "react-router-dom";

export default function Customer() {
  const { customerData, error, loading } = useFetchCustomer();
  const navigate = useNavigate();
  
  const handleInfo = (id) => {
    navigate(`/Info/${id}`);
  };

  return (
    <div>
      <Button
      text="Tranfer History"
      classname="bg-blue-600 mt-4 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 "
      onClick={()=>navigate("/transferhistory")}
      />
      <div className="bg-blue-200 flex items-center gap-y-2 h-[400px] w-1/2 m-auto shadow-lg flex-col mt-10">
        <h2 className="text-2xl font-bold mt-2">Customer</h2>
        <div className="mt-4 overflow-y-auto max-h-[300px] w-full px-4 m-2 shadow-inner">
          {loading && (
            <div>
              <Loading />
            </div>
          )}
          {error && (
            <div>
              <Error message={error} />
            </div>
          )}
          {customerData && customerData.map((customer, index) => (
            <AllAccount
              key={customer._id}
              id={customer._id}
              number={index + 1}
              name={customer.name}
              email={customer.email}
              onClick={() => handleInfo(customer._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
