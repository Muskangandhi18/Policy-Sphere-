import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClaimsTab from "./ClaimsTab";
import UsersTab from "./UsersTab";
import PoliciesTab from "./PoliciesTab";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("claims");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading state for API calls
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4 fw-bold">Admin Dashboard</h1>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4">
        
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "policies" ? "active" : ""}`}
            onClick={() => setActiveTab("policies")}
          >
            Assigned Policies
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "claims" ? "active" : ""}`}
            onClick={() => setActiveTab("claims")}
          >
            Claims
          </button>
        </li>
      </ul>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          
          {activeTab === "users" && <UsersTab />}
          {activeTab === "policies" && <PoliciesTab />}
          {activeTab === "claims" && <ClaimsTab navigate={navigate} />}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
