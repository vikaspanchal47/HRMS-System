import { useState } from "react";
import API from "../services/api";

function AttendanceForm() {

  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present"
  });

  const submitAttendance = async (e) => {
    e.preventDefault();

    try {
      await API.post("/attendance/", form);
      alert("Attendance marked");
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  return (
    <div className="card">

      <h3>Mark Attendance</h3>

      <form onSubmit={submitAttendance} className="form-row">

        <input
          placeholder="Employee ID"
          onChange={(e) => setForm({...form, employee_id: e.target.value})}
        />

        <input
          type="date"
          onChange={(e) => setForm({...form, date: e.target.value})}
        />

        <select
          onChange={(e) => setForm({...form, status: e.target.value})}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button type="submit">Submit</button>

      </form>

    </div>
  );
}

export default AttendanceForm;