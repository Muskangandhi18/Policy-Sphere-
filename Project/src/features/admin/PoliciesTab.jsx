import React, { useEffect, useState } from "react";

const PoliciesTab = () => {
  const [upolicies, setPolicies] = useState([]);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/upolicy/userPolicy", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
console.log(response)
      if (!response.ok) {
        throw new Error("Failed to fetch policies");
      }

      const data = await response.json();
      setPolicies(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  return (
    <div className="table-responsive shadow-lg rounded p-3 bg-light">
      <table className="table table-bordered table-hover table-striped">
        <thead className="table-info">
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Policy ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {upolicies.length > 0 ? (
            upolicies.map((upolicy) => (
              <tr key={upolicy.orderId}>
                <td>{upolicy.orderId}</td>
                <td>{upolicy.id}</td>
                <td>{upolicy.policyId}</td>
                <td>{upolicy.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No assigned policies found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PoliciesTab;
