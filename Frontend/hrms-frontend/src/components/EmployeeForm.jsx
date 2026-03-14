import { useState } from "react";
import API from "../services/api";

function EmployeeForm() {

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      await API.post("/employees/", form);
      alert("Employee added successfully");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  return (
    <div className="card">

      <h3>Add Employee</h3>

      <form onSubmit={handleSubmit} className="form-row">

        <input
          placeholder="Employee ID"
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
        />

        <input
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <select
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          <option value="">Department</option>
          <option>Engineering</option>
          <option>HR</option>
          <option>Finance</option>
        </select>

        <button type="submit">Add</button>

      </form>

    </div>
  );
}

export default EmployeeForm;