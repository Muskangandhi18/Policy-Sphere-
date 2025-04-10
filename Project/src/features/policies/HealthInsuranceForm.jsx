import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const HealthInsuranceForm = ({ visible, handleClose, handleSubmitButton, selectedPolicy }) => {
  // console.log("selected policy",selectedPolicy)
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phone: '',
    email: '',
    preExistingConditions: '',
    allergies: '',
    coverageAmount: '',
    additionalCoverage: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const payload = {
       // data: formData,
        policyId: selectedPolicy,
        id: user.id,
       // orderId: user.orderId
      };
     console.log(payload);
    
const token=await localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/upolicy/upolicy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Failed to assign policy: ${response.statusText}, Details: ${errorDetail}`);
      }

      const result = await response.json();
      alert("Policy assigned successfully!");
      handleSubmitButton(result);
    } catch (err) {
      console.error("Error assigning policy:", err.message);
      alert(`Failed to assign policy. Please try again. Details: ${err.message}`);
    }
  };

  return (
    <Modal show={visible} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="text-success">Health Insurance Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs.Root defaultValue="tab1" className="shadow-lg p-4 rounded">
          <Tabs.List className="nav nav-tabs">
            <Tabs.Trigger value="tab1" className="nav-link active">Personal Info</Tabs.Trigger>
            <Tabs.Trigger value="tab2" className="nav-link">Medical History</Tabs.Trigger>
            <Tabs.Trigger value="tab3" className="nav-link">Plan Preferences</Tabs.Trigger>
          </Tabs.List>

          {/* Personal Info Tab */}
          <Tabs.Content value="tab1" className="mt-4">
            <h3>Personal Information</h3>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </Tabs.Content>

          {/* Medical History Tab */}
          <Tabs.Content value="tab2" className="mt-4">
            <h3>Medical History</h3>
            <div className="mb-3">
              <label htmlFor="preExistingConditions" className="form-label">Pre-existing Conditions</label>
              <textarea
                className="form-control"
                id="preExistingConditions"
                name="preExistingConditions"
                value={formData.preExistingConditions}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="allergies" className="form-label">Allergies</label>
              <textarea
                className="form-control"
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
              />
            </div>
          </Tabs.Content>

          {/* Plan Preferences Tab */}
          <Tabs.Content value="tab3" className="mt-4">
            <h3>Insurance Plan Preferences</h3>
            <div className="mb-3">
              <label htmlFor="coverageAmount" className="form-label">Coverage Amount</label>
              <input
                type="number"
                className="form-control"
                id="coverageAmount"
                name="coverageAmount"
                value={formData.coverageAmount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="additionalCoverage"
                name="additionalCoverage"
                checked={formData.additionalCoverage}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="additionalCoverage">
                Add additional coverage for critical illness
              </label>
            </div>
            <button className="btn btn-success w-100" onClick={handleSubmit}>
              Confirm Purchase
            </button>
          </Tabs.Content>
        </Tabs.Root>
      </Modal.Body>
    </Modal>
  );
};

// PropTypes validation
HealthInsuranceForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmitButton: PropTypes.func.isRequired,
  selectedPolicy: PropTypes.string.isRequired, // Add this line to validate selectedPolicy
};

export default HealthInsuranceForm;
