import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [errors, setErrors] = useState({ email: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") validateEmail(value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors({ email: !emailRegex.test(email) ? "Invalid email format" : "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.email) return;

    try {
      setStatus("loading");
      setError("");

      const apiUrl =
        formData.role === "admin"
          ? "http://localhost:5000/users/adminlogin"
          : "http://localhost:5000/users/login";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        await localStorage.setItem("token", data.token);

        setStatus(true);
       // window.location.reload();

        if (formData.role === "admin") {
          await localStorage.setItem(
            "admin",
            JSON.stringify({
              age: 18,
              email: "muskan5@gmail.com",
              id: 1,
              income: 80000,
              name: "Muskan Gandhi",
              password: "123",
            })
          );
          navigate("/dashboard"); // Redirect to admin dashboard
          
        } else {
          await localStorage.setItem("user", JSON.stringify(data.userData));

          navigate("/loginSuccess");
          window.location.reload();
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid credentials");
      }
    } catch (err) {
      setStatus("failed");
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              className="form-control"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
          {status === "success" && (
            <div className="text-success text-center mt-3">
              Login successful!
            </div>
          )}
          {error && <div className="text-danger text-center mt-3">{error}</div>}
        </form>
        <p className="text-center mt-3">
          Do not have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
