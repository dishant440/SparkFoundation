import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Info from "./pages/Info";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import Send from "./pages/Send";
import Success from "./pages/Success";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Info/:id" element={<Info />} />
          <Route path="/transferhistory" element={<Transfer />} />
          <Route path="/sendMoney" element={<Send />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
