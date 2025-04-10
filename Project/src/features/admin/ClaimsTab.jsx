import React, { useEffect, useState } from "react";

const ClaimsTab = ({ navigate }) => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/claims", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate("/login");
        }
        throw new Error("Failed to fetch claims");
      }

      const data = await response.json();
      setClaims(data);
    } catch (error) {
      console.error("Error fetching claims:", error);
    }
  };

  return (
    <div className="table-responsive shadow-lg rounded p-3 bg-light">
      <table className="table table-bordered table-hover table-striped">
        <thead className="table-primary">
          <tr>
            <th>Claim ID</th>
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {claims.length > 0 ? (
            claims.map((claim) => (
              <tr key={claim.claimsId}>
                <td className="fw-bold">{claim.claimsId}</td>
                <td>
                  <span
                    className={`badge ${
                      claim.status === "Approved"
                        ? "bg-success"
                        : claim.status === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                    }`}
                  >
                    {claim.status}
                  </span>
                </td>
                <td>{claim.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No claims found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimsTab;
