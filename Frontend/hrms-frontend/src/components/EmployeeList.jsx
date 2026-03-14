import { useEffect, useState } from "react";
import API from "../services/api";

function EmployeeList() {

  const [employees, setEmployees] = useState([]);

  const [filters, setFilters] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: ""
  });

  // Fetch employees from API
  const fetchEmployees = async (customFilters = filters) => {

    try {

      let query = [];

      if (customFilters.employee_id)
        query.push(`employee_id=${customFilters.employee_id}`);

      if (customFilters.name)
        query.push(`name=${customFilters.name}`);

      if (customFilters.email)
        query.push(`email=${customFilters.email}`);

      if (customFilters.department)
        query.push(`department=${customFilters.department}`);

      const url = query.length
        ? `/employees?${query.join("&")}`
        : "/employees";

      const res = await API.get(url);

      setEmployees(res.data);

    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {

    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    await API.delete(`/employees/${id}`);

    fetchEmployees();
  };

  // Load employees on page load
  useEffect(() => {

    const loadEmployees = async () => {
      await fetchEmployees();
    };

    loadEmployees();

  }, []);

  return (
    <div className="card">

      <h3>Employee List</h3>

      {/* Filter Section */}

      <div className="form-row" style={{ marginBottom: "15px" }}>

        <input
          placeholder="Employee ID"
          value={filters.employee_id}
          onChange={(e) =>
            setFilters({ ...filters, employee_id: e.target.value })
          }
        />

        <input
          placeholder="Name"
          value={filters.name}
          onChange={(e) =>
            setFilters({ ...filters, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={filters.email}
          onChange={(e) =>
            setFilters({ ...filters, email: e.target.value })
          }
        />

        <select
          value={filters.department}
          onChange={(e) =>
            setFilters({ ...filters, department: e.target.value })
          }
        >
          <option value="">All Departments</option>
          <option>Engineering</option>
          <option>HR</option>
          <option>Finance</option>
        </select>

        <button onClick={() => fetchEmployees()}>Search</button>

        <button
          style={{ background: "#6b7280" }}
          onClick={() => {

            const resetFilters = {
              employee_id: "",
              name: "",
              email: "",
              department: ""
            };

            setFilters(resetFilters);
            fetchEmployees(resetFilters);
          }}
        >
          Reset
        </button>

      </div>

      {/* Employee Table */}

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {employees.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.employee_id}>

                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>

                <td>
                  <button
                    style={{ background: "#ef4444" }}
                    onClick={() => deleteEmployee(emp.employee_id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeList;