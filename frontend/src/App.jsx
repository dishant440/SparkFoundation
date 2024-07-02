import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Info from "./pages/Info";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import Send from "./pages/Send";
import Success from "./pages/Success";
import Error from "./pages/Error";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Info/:id" element={<Info />} />
          <Route path="/transferhistory" element={<Transfer />} />
          <Route path="/sendMoney" element={<Send />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
