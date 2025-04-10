import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userData, setUserData] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  // console.log(isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      setIsLoggedIn(true);
    }

    const adminData = localStorage.getItem("admin");
    const userData = localStorage.getItem("user");

    if (adminData) {
      setUserData(JSON.parse(adminData));
      setUserRole("admin");
    } else if (userData) {
      setUserData(JSON.parse(userData));
      setUserRole("user");
    }
  }, []);

  const handleLogout = async () => {
    // Clear token and role-based user data
    await localStorage.removeItem("token");
    if (userRole) {
      localStorage.removeItem(userRole); // Dynamically removes "admin" or "user" data
    }
    // Clear local state
    setIsLoggedIn(false);
    setUserData(null);
    setUserRole("");
    // Redirect to login
    navigate("/login");
  };

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="./image.png.png"
            alt="Logo"
            style={{ height: "50px", width: "50px" }}
            className="me-2"
          />
        </Link>
        <h3
          className="mb-0 fw-bold"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <span className="text-primary">Policy</span>
          <span style={{ color: "pink" }}>Market</span>
        </h3>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item">
              <Link to="/PolicyCard" className="btn btn-lg text-light px-4">
                Available Policies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/about-us">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              {isLoggedIn ? (
                <>
                  {userRole === "admin" ? (
                    <button
                      className="btn btn-primary ms-3"
                      onClick={() => navigate("/admin-dashboard")}
                    >
                      Admin Dashboard
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary ms-3"
                      onClick={() => navigate("/dashboard")}
                    >
                      {userData?.name}'s Dashboard
                    </button>
                  )}
                  <button
                    className="btn btn-danger ms-3"
                    onClick={handleLogout}
                  >
                    LogOut
                  </button>
                </>
              ) : (
                <button
                  className="nav-link text-light"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
            </li>
            <li className="nav-item">
              <button
                className="btn btn-success ms-3"
                onClick={openChat}
                title="Contact Expert"
              >
                💬 Contact Expert
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Chat Modal */}
      <Modal
        isOpen={isChatOpen}
        onRequestClose={closeChat}
        contentLabel="Expert Chat"
        style={{
          content: {
            width: "90%",
            height: "80%",
            margin: "auto",
            borderRadius: "10px",
          },
        }}
      >
        <iframe
          src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/29/10/20250129104650-M4LD1YWL.json"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "8px",
          }}
          title="Bot Chat"
        />
        <button className="btn btn-danger mt-3" onClick={closeChat}>
          Close Chat
        </button>
      </Modal>
    </nav>
  );
};

export default Navbar;
