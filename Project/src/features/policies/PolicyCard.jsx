import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import HealthInsuranceForm from "./HealthInsuranceForm";

const PolicyCard = () => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [detailsShow, setDetailsShow] = useState(false);
  const [selectedPolicyDetails, setSelectedPolicyDetails] = useState({});
  const [selectedPolicy, setSelectedPolicy] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      const adminData = localStorage.getItem("admin");
      setIsAdmin(!!adminData); // Check if admin data is present in localStorage
    }
  }, []);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("http://localhost:5000/policy/policy", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPolicies(data);
      } catch (err) {
        console.error("Error fetching policies:", err.message);
      }
    };

    fetchPolicies();
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/Login");
  };

  const handleAddPolicy = () => {
    navigate("/addPolicy");
  };

  const handleBuyNow = (policyId) => {
    setFormShow(true);
    setSelectedPolicy(policyId);
  };

  const handleViewDetails = (policy) => {
    setSelectedPolicyDetails(policy);
    setDetailsShow(true);
  };

  const handleBuyPolicy = async () => {
    setSuccessMessage("Thank you! Policy purchased successfully.");
    setTimeout(() => setSuccessMessage(""), 10000);
  };

  const filteredPolicies = policies.filter((policy) =>
    policy.policyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-primary">Available Policies</h1>

      {successMessage && (
        <div className="alert alert-success text-center" role="alert">
          {successMessage}
        </div>
      )}

      {/* Search Bar and Add Policy Button */}
      <div className="d-flex justify-content-between mb-4">
        <input
          type="text"
          className="form-control form-control-lg w-75"
          placeholder="Search policies by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isAdmin && (
          <button
            className="btn btn-outline-success btn-lg rounded-circle ms-3"
            onClick={handleAddPolicy}
          >
            <i className="bi bi-plus-lg">+</i> {/* Bootstrap icon for plus */}
          </button>
        )}
      </div>

      <div className="row g-4">
        {filteredPolicies.length > 0 ? (
          filteredPolicies.map((policy, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 shadow-lg border-0 rounded-3 overflow-hidden">
                <div className="card-body text-center">
                  {/* Icon-style circular photo */}
                  <img
                    src={policy.url}
                    alt={policy.policyName}
                    className="rounded-circle mb-3"
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <h5 className="card-title text-primary mb-3">
                    {policy.policyName}
                  </h5>
                  <p className="card-text">
                    <strong>Premium:</strong> ${policy.premium}
                  </p>
                  <p className="card-text">
                    <strong>Duration:</strong> {policy.duration} months
                  </p>
                  <div className="d-flex flex-column gap-3">
                    <button
                      className="btn btn-outline-primary btn-lg w-100 rounded-pill"
                      onClick={() => handleViewDetails(policy)}
                    >
                      View Details
                    </button>

                    {loggedIn ? (
                      <button
                        className="btn btn-success btn-lg w-100 rounded-pill"
                        onClick={() => handleBuyNow(policy.policyId)}
                      >
                        Buy Now
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-lg w-100 rounded-pill"
                        onClick={handleLogin}
                      >
                        Login to Buy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p className="text-muted">No matching policies found.</p>
          </div>
        )}
      </div>

      {/* Health Insurance Form Modal */}
      <HealthInsuranceForm
        visible={formShow}
        handleClose={() => setFormShow(false)}
        handleSubmitButton={handleBuyPolicy}
        selectedPolicy={selectedPolicy}
      />

      {/* Policy Details Modal */}
      <Modal
        show={detailsShow}
        onHide={() => setDetailsShow(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            {selectedPolicyDetails.policyName} Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Description:</strong> {selectedPolicyDetails.details}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PolicyCard;
