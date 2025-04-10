import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPolicyForm = () => {
  const [policyName, setPolicyName] = useState("");
  const [url, setUrl] = useState("");
  const [details, setDetails] = useState("");
  const [premium, setPremium] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
  
    if (!policyName || !premium || !duration||!url||!details) {
      setError("All fields are required.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      // console.log(token)
      if (!token) {
        throw new Error("Unauthorized: No token found. Please log in.");
      }
  
      const response = await fetch("http://localhost:5000/policy/policy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token here
        },
        body: JSON.stringify({ policyName, premium, duration ,url,details}),
      });
  
      // console.log(response);
  
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Invalid or expired token.");
        } else {
          throw new Error("Failed to add policy");
        }
      }
  
      setSuccessMessage("Policy added successfully!");
      setPolicyName("");
      setPremium("");
      setDuration("");
      setUrl("");
      setDetails("");
  
      setTimeout(() => navigate("/PolicyCard"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="container my-5">
      <h2 className="text-center text-primary mb-4">Add New Policy</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded">
        <div className="mb-3">
          <label className="form-label">Policy Name</label>
          <input
            type="text"
            className="form-control"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Premium ($)</label>
          <input
            type="number"
            className="form-control"
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Duration (months)</label>
          <input
            type="number"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Url</label>
          <input
            type="text"
            className="form-control"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Details</label>
          <input
            type="text"
            className="form-control"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Policy</button>
      </form>
    </div>
  );
};

export default AddPolicyForm;
