import { useNavigate } from 'react-router-dom';

const LoginSuccess = () => {
  const navigate = useNavigate();
  // window.location.reload();
  const handleGoToDashboard = () => {
    navigate('/dashboard'); // Navigate to dashboard
    window.location.reload();

  }; 
  //  window.location.reload();
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 rounded-3" style={{ height:'550px',width: '550px' }}>
        <div className="text-center mb-3">
          <h3 className="display-5 text-success">
            Login Successful! <span role="img" aria-label="checkmark"></span>
          </h3>
          <p className="lead text-muted">Welcome back! You have successfully logged in.</p>
        </div>
        {/* Image Section */}
        <div className="text-center mb-3">
          <img
            src="https://static.vecteezy.com/system/resources/previews/017/639/144/non_2x/account-has-been-registered-login-success-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
            alt="Login Success"
            className="img-fluid rounded-3"
            style={{ maxWidth: '100%', height: '300px' }}
          />
        </div>
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary btn-lg"
            onClick={handleGoToDashboard}
            style={{
              backgroundColor: '#007bff',
              borderRadius: '50px',
              boxShadow: '0 4px 8px rgba(0, 123, 255, 0.4)',
            }}
          >
            Go to Your Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSuccess;
