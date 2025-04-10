import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

const ClaimForm = () => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const location = useLocation();
  const { state } = location;
  const { order } = state || {};
  const [formData,setFormData]=useState({"orderId":order.orderId})

  const handleSubmit = async (e) => {
    e.preventDefault();

   

    setLoading(true); // Set loading state

    try {
      
      console.log("formdata===>",formData)
      
      const response = await fetch("http://localhost:5000/claims/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
    

      setSuccess(result.message || "Claim created successfully!");
      setError("");
      setDescription("");
      setStatus("Pending");
      setFile(null);
    } catch (err) {
      console.error("Error creating claim:", err.message);
      setError("Failed to create claim.");
      setSuccess("");
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  // console.log(order)
  const handleChange = (e) => {
    const { name, value } = e.target;
 
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: "#007bff" }}>
        Create a Claim
      </h2>

      {order && (
        <div className="alert alert-info text-center">
          <strong>Order ID:</strong> {order.orderId}
        </div>
      )}

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {success && (
        <div className="alert alert-success text-center">{success}</div>
      )}

      <form onSubmit={(handleSubmit)}>
        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            Claim Description
          </label>
          <textarea
          name="description"
            id="description"
            className="form-control"
            rows="4"
            // value={description}
            onChange={handleChange}
            placeholder="Enter the description of the claim"
          ></textarea>
          <small className="text-muted d-block mt-1">
            {description.length} / 500 characters
          </small>
        </div>

        <div className="mb-4">
          <label htmlFor="file" className="form-label">
            Supporting Document (Optional)
          </label>
          <input
            type="file"
            id="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <div className="mt-2">
            <span
              className={`badge ${
                status === "Pending"
                  ? "bg-warning"
                  : status === "Approved"
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg w-100"
          style={{ borderRadius: "30px" }}
          disabled={loading}
        >
          {loading ? "Creating Claim..." : "Create Claim"}
        </button>
      </form>
    </div>
  );
};

export default ClaimForm;
