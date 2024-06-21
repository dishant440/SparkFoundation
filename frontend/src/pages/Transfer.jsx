import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading'; 
import Error from '../components/Error'; 

export default function TransferHistory() {
  const [transferData, setTransferData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransferData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/history');
        setTransferData(response.data.transferHistory);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransferData();
  }, []);
  console.log(transferData);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="max-h-96 overflow-y-auto mx-auto shadow-lg w-3/4 mt-4">
        <div className="flex justify-center mt-10 mb-5 font-bold text-3xl">
            <h1>Transactions</h1>
        </div>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 sticky top-0 z-10">
          <tr>
            <th className="py-2 px-4 border-b border-gray-300">Debited</th>
            <th className="py-2 px-4 border-b border-gray-300">Credited</th>
            <th className="py-2 px-4 border-b border-gray-300">Amount</th>
            <th className="py-2 px-4 border-b border-gray-300">Date</th>
          </tr>
        </thead>
        <tbody>
          {transferData.map((transfer, index) => (
            <tr key={index} className="bg-white hover:bg-gray-100">
              <td className="py-3 px-4 text-center border-b border-gray-300">{transfer.fromCustomer[0].name}</td>
              <td className="py-3 px-4 text-center border-b border-gray-300">{transfer.toCustomer[0].name}</td>
              <td className="py-3 px-4 text-center border-b border-gray-300">{transfer.amount}</td>
              <td className="py-3 px-4 text-center border-b border-gray-300">{transfer.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
