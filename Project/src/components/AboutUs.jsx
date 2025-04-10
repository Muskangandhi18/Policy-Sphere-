// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 text-primary">About Us</h2>

      <div className="row">
        <div className="col-md-6">
          <h4 className="text-secondary">Our Mission</h4>
          <p className="text-muted">
            At PolicyMarket, we aim to provide easy access to a wide range of insurance products, empowering you to make informed decisions about your financial security.
          </p>
        </div>

        <div className="col-md-6">
          <h4 className="text-secondary">Our Vision</h4>
          <p className="text-muted">
            To be the leading insurance marketplace where individuals and businesses can find and purchase insurance policies effortlessly.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-secondary">Our Team</h4>
        <p className="text-muted">
          Our dedicated team of insurance experts is committed to offering the best customer service and support to help you with your insurance needs.
        </p>
      </div>

      <div className="mt-5">
        <h4 className="text-secondary">Why Choose Us?</h4>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Wide range of insurance options
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Easy comparison of policies
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Expert advice and support
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Quick and hassle-free application process
          </li>
        </ul>
      </div>

      <div className="mt-5">
        <h4 className="text-secondary">Contact Us</h4>
        <p className="text-muted">
          Email: <a href="mailto:support@policymarket.com">support@policymarket.com</a>
        </p>
        <p className="text-muted">
          Phone: +1 234 567 890
        </p>
        <p className="text-muted">
          Address: Plot-15A,Eco Tower,Sec-12,Pune
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
