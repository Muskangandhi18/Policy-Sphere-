import { Link } from 'react-router-dom';
import CustomersSection from './CustomersSection';
import PolicyCard from '../features/policies/PolicyCard';

const HeroSection = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <div
        className="container-fluid text-white text-center d-flex flex-column justify-content-center align-items-center vh-100"
        style={{
          background: `linear-gradient(to right, white 0%, rgba(0,0,0,0)),url(https://shorturl.at/aRCli)`,
          backgroundSize: '400px 300px',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h1 className="display-4 fw-bold mb-4">
          <span style={{ color: '#007bff' }}>Welcome to</span>{' '}
          <span style={{ color: 'pink' }}>Policy Market!</span>
        </h1>
        <p className="lead mb-4 w-75 mx-auto" style={{ color: '#007bff' }}>
          Discover your one-stop solution for all your needs. Join us today to explore limitless possibilities and connect like never before!
        </p>

        <Link to="/PolicyCard" className="btn btn-lg text-light px-4" style={{ backgroundColor: 'blue' }}>
          Available Policies
        </Link>
  
      </div>

      {/* Customer Logos Section */}
      <CustomersSection />

      {/* Features Section */}
      <div className="container py-5">
        <h2 className="text-center" style={{ color: '#007bff' }}>Why Choose Us?</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="card-body">
                <i className="bi bi-speedometer2 display-4 text-primary mb-3"></i>
                <h5 className="card-title fw-bold">Fast & Reliable</h5>
                <p className="card-text">Experience unmatched speed and reliability with our services.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="card-body">
                <i className="bi bi-people-fill display-4 text-secondary mb-3"></i>
                <h5 className="card-title fw-bold">User-Friendly</h5>
                <p className="card-text">Our platform is designed with your convenience in mind.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="card-body">
                <i className="bi bi-lock-fill display-4 text-success mb-3"></i>
                <h5 className="card-title fw-bold">Secure</h5>
                <p className="card-text">Your data is safe with our cutting-edge security measures.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PolicyCard/>
      {/* Call to Action Section */}
      <div
        className="text-white text-center py-5"
        style={{
          backgroundImage: 'url()', // Image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h2 className="mb-3">Ready to Get Started?</h2>
      </div>

      {/* Support Section */}
      <div className="container text-center py-5">
        <h2 style={{ color: '#007bff' }}>Have a Question? Here to Help.</h2>
        <p className="lead text-muted mb-4">
          Our friendly customer support team is your extended family. Speak your heart out. They listen with undivided attention to resolve your concerns. Give us a call, request a callback or drop us an email — we’re here to help.
        </p>

        <div className="row text-start">
          <div className="col-md-6">
            <h5>General Enquiries</h5>
            <p>Email: <a href="mailto:care@policymarket.com">care@policymarket.com</a></p>
          </div>
          <div className="col-md-6">
            <h5>Customer Sales Enquiries</h5>
            <p>Call: <a href="tel:18002088787">1800 - 208 - 8787</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
