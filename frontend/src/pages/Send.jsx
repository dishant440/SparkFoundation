import { useState,useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useSendMoney } from "../hooks";


export default function Send() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [inputError, setInputError] = useState("");
  const { loading, error, sendMoney } = useSendMoney();
  const navigate = useNavigate();
  useEffect(() => {
    if (inputError) {
      const timer = setTimeout(() => {
        setInputError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [inputError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInputError("");
    if (!sender || !receiver || !amount) {
      setInputError("All fields are required.");
      return;
    }

    try {
      const response = await sendMoney(sender, receiver, amount);
      if (response) {
        navigate("/success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-evenly items-center p-4 mt-20">
      <div className="left bg-blue-50 shadow-xl border-red-200 flex flex-col w-[300px] justify-center items-center p-4">
        {error && <span className="text-red-500">{error}</span>}
        {inputError && <span className="text-red-500">{inputError}</span>}

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Send Money</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            Label="SenderId"
            Placeholder="Enter your id"
            name="senderId"
            required={true}
            Value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
          <Input
            Label="ReceiverId"
            Placeholder="Enter Receiver Id"
            name="ReceiverId"
            required={true}
            Value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
          <Input
            Label="Amount"
            Placeholder="Enter Amount"
            name="Amount"
            required={true}
            Value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button
            classname="w-full bg-blue-600 mt-4 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            text={loading ? "Sending.." : "Send Money"}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}
