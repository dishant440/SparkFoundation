import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Success() {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Success!</h2>
        <p className="mb-4">Money was transferred successfully.</p>
        <Button
          className="bg-blue-500 mt-2 p-1"
          text="Back to Dashboard"
          onClick={handleBackToDashboard}
        />
      </div>
    </div>
  );
}
