import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <BrowserRouter>

      <div className="navbar">
        <h2>HRMS Lite</h2>

        <div className="nav-links">
          <Link to="/">Employees</Link>
          <Link to="/attendance">Attendance</Link>
        </div>
      </div>

      <div className="page">
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;