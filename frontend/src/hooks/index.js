import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchCustomer = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/allCustomer"
        );
        setCustomerData(response.data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, []);
  return { loading, customerData, error };
};


export const useFetchInfo = (id) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      // console.log('Fetching info for ID:', id); // Log the ID being fetched
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/${id}`
        );
        // console.log('API response:', response); // Log the full response
        setInfo(response.data.user);
        // console.log('User info set to:', response.data.user); // Log the user info being set
      } catch (error) {
        // console.error('Error fetching info:', error); // Log any errors
        setError('Unable to get info');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInfo();
    } else {
      console.warn('No ID provided'); // Warn if no ID is provided
    }
  }, [id]);

  return { loading, info, error };
};