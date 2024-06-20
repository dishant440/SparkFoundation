import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchCustomer = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchCustomer = async() =>{
      try {
        const response = await axios.get("http://localhost:8080/api/user/allCustomer");
        setCustomerData(response.data.users);
      } catch (error) {
        setError(error.message);
      }finally{
        setLoading(false);
      }
    }
    fetchCustomer();
  },[])
  return{loading,customerData,error}
};
