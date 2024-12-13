import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employee = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.employee.firstName}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.employee.lastName}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.employee.role}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.employee.salary}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.employee._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteEmployee(props.employee._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  // fetch employees from DB
  useEffect(() => {
    async function getEmployees() {
      const response = await fetch(`http://localhost:5050/employee/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const employees = await response.json();
      setEmployees(employees);
    }
    getEmployees();
    return;
  }, [employees.length]);

  // delete an employee
  async function deleteEmployee(id) {
    await fetch(`http://localhost:5050/employee/${id}`, {
      method: "DELETE",
    });
    const newEmployees = employees.filter((el) => el._id !== id);
    setEmployees(newEmployees);
  }

  // maps employees on table
  function employeeList() {
    return employees.map((employee) => {
      return (
        <Employee
        employee={employee}
          deleteEmployee={() => deleteEmployee(employee._id)}
          key={employee._id}
        />
      );
    });
  }

  // display table of employees.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Employees</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  First Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Last Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Role
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Salary
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {employeeList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}