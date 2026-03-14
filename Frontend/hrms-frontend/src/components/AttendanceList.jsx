import { useState } from "react";
import API from "../services/api";

function AttendanceList() {

  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);

  const fetchAttendance = async () => {

    let url = "/attendance?";

    if (employeeId) {
      url += `employee_id=${employeeId}&`;
    }

    if (date) {
      url += `date=${date}`;
    }

    const res = await API.get(url);
    setRecords(res.data);
  };

  return (
    <div className="card">

      <h3>Attendance Records</h3>

      <div style={{marginBottom:"10px"}}>

        <input
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={fetchAttendance}>Filter</button>

      </div>

      <table>

        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {records.length === 0 ? (
            <tr>
              <td colSpan="3">No attendance records</td>
            </tr>
          ) : (
            records.map((r) => (
              <tr key={r.id}>
                <td>{r.employee_id}</td>
                <td>{r.date}</td>
                <td>{r.status}</td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default AttendanceList;