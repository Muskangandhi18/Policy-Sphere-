import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PoliciesCard = () => {
  const [policies, setPolicies] = useState([]);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicies = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }

      try {
        const response = await fetch("http://localhost:5000/upolicy/upolicy", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPolicies(data);
      } catch (err) {
        console.log("Error fetching policies:", err.message);
        setError("Failed to fetch policies.");
      }
    };

    fetchPolicies();
  }, []);

  const handleClaimButtonClick = (policy) => {
    navigate("/claimform", { state: { order: policy } });
  };

  return (
    <div className="container mt-5">
      {userData && (
        <div className="text-center mb-4">
          <h3>Welcome, {userData.name}!</h3>
          <p>Age: {userData.age}</p>
          <p>Income: {userData.income}</p>
          <p>Your Assigned Policies are:</p>
        </div>
      )}

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row g-4">
        {policies?.map((policy) => (
          <div key={policy.id} className="col-md-4 mb-4">
            <div className="card shadow-lg bg-dark text-white border-0 rounded-lg">
              <div className="card-img-top text-center p-4">
                <img
                  src={policy.policy.url}
                  alt={policy.policy.policyName}
                  className="rounded-circle"
                  style={{
                    height: "150px",
                    width: "150px",
                    objectFit: "cover",
                    border: "3px solid #007bff",
                  }}
                />
              </div>
              <div className="card-body text-center">
                <h5 className="card-title text-primary">{policy.policy.policyName}</h5>
                <p className="card-text">
                  <strong>Premium:</strong> ${policy.policy.premium}
                </p>
                <p className="card-text">
                  <strong>Duration:</strong> {policy.policy.duration} months
                </p>
                <button
                  onClick={() => handleClaimButtonClick(policy)}
                  className="btn btn-outline-primary btn-lg w-100"
                  style={{ borderRadius: "30px" }}
                >
                  Get Claim
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliciesCard;
