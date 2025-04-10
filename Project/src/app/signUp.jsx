import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age:'',
    income:''
  });

  const [errors, setErrors] = useState({ email: '' });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === 'email') {
      validateEmail(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: emailRegex.test(email) ? '' : 'Invalid email format',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Revalidate email before submitting
    validateEmail(formData.email);
    if (errors.email) return;

    try {
      setStatus('loading');
      setError('');

      const response = await fetch('http://localhost:5000/users/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setStatus('success');
        console.log('Signup successful:', data);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }
    } catch (err) {
      setStatus('failed');
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Income</label>
            <input
              type="income"
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Signing up...' : 'Signup'}
          </button>

          {/* Success Message */}
          {status === 'success' && (
            <div className="alert alert-success mt-3" role="alert">
              Signup successful!
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
