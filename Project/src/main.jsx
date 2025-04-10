import React from 'react';
import ReactDOM from 'react-dom/client'; // Modern import for rendering
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './app/store';
import PolicyCard from './features/policies/PolicyCard';
import Signup from './app/signUp';
import Login from './app/loginPage';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Navbar from './components/NavBar';
import UserDashboard from './features/user/UserDashboard';
import AboutUs from './components/AboutUs'; 
import ClaimForm from './claims/claimForm';
import LoginSuccess from './app/loginSuccess';
import AdminDashboard from './features/admin/AdminDashboard';
import AddPolicyForm from './features/policies/admin/AddPolicyForm';

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginSuccess" element={<LoginSuccess/>}/>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/PolicyCard" element={<PolicyCard />} />
          <Route path="/claimform" element={<ClaimForm />} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/addPolicy" element={<AddPolicyForm />} />
        </Routes>
        <Footer />
      </Provider>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')); // Modern root creation
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
