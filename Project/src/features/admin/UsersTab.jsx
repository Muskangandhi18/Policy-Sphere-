import React, { useEffect, useState } from "react";

const UsersTab = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.recordset);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="table-responsive shadow-lg rounded p-3 bg-light">
      <table className="table table-bordered table-hover table-striped">
        <thead className="table-success">
          <tr>
            <th>Name</th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td className="fw-bold">{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTab;
