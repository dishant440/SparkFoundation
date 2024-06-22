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
        setError("something went wrong");
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
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/${id}`
        );

        setInfo(response.data.user);
      } catch (error) {
        setError("Unable to get info");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInfo();
    } else {
      console.warn("No ID provided"); // Warn if no ID is provided
    }
  }, [id]);

  return { loading, info, error };
};

export const useSendMoney = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMoney = async (sender, receiver, amount) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/user/transfer",
        {
          sender,
          receiver,
          amount,
        }
      );

      console.log(response.data);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error sending money");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendMoney, loading, error };
};
