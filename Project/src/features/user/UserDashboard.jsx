// import React from 'react';
// import Navbar from '../../../components/NavBar';// Assuming Navbar component is in the same directory
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPolicyCard from '../userpolicy/UserPolicyCard';

const UserDashboard = () => {
  return (
    <div>
      <div className="container mt-4">
        <UserPolicyCard/>
      </div>
    </div>
  );
};

export default UserDashboard;
