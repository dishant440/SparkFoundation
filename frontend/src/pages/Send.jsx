import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useSendMoney } from "../hooks";

export default function Send() {
  const [sender, SetSender] = useState("");
  const [receiver, SetReceiver] = useState("");
  const [amount, SetAmount] = useState("");
  const { loading, error, sendMoney } = useSendMoney();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendMoney(sender, receiver, amount);
      if (response) {
        navigate("/success");
      }
    } catch (error) {}
  };

  return (
    <div className="flex justify-evenly items-center p-4 mt-20">
      <div className="left bg-blue-50 shadow-xl border-red-200 flex flex-col w-[300px] justify-center items-center p-4 ">
        {error && <span className="text-red-500">{error}</span>}

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Send Money</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            Label="SenderId"
            Placeholder="Enter your id"
            name="senderId"
            Value={sender}
            onChange={(e) => SetSender(e.target.value)}
          />
          <Input
            Label="ReceiverId"
            Placeholder="Enter Receiver Id"
            name="ReceiverId"
            Value={receiver}
            onChange={(e) => SetReceiver(e.target.value)}
          />
          <Input
            Label="Amount"
            Placeholder="Enter Amount"
            name="Amount"
            Value={amount}
            onChange={(e) => SetAmount(e.target.value)}
          />
          <Button
            classname="w-full bg-blue-600 mt-4 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 "
            text={loading ? "Sending.." : "Send Money"}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}
