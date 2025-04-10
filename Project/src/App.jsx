import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
// // import React from 'react';
// // import ReactDOM from 'react-dom';



// import { Provider } from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import store from './app/store';
// import PolicyCard from './features/policies/components/PolicyCard';
// import Signup from './app/signUp';
// import Login from './app/loginPage';
// import HomePage from './components/HomePage';
// import Footer from './components/Footer';
// import Navbar from './components/NavBar';
// import UserDashboard from './features/user/components/UserDashboard';
// import AboutUs from './components/AboutUs'; // Import the new AboutUs component
// // import ForgotPassword from './app/ForgotPassword';

// const App = () => {
//   return (
//     <Router>
//       <Provider store={store}>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/dashboard" element={<UserDashboard />} />
//           <Route path="/about-us" element={<AboutUs />} /> {/* Add About Us route */}
//           {/* <Route path="/forgot-password" element={<ForgotPassword/>}/> */}
//           <Route path ="/PolicyCard" element={<PolicyCard/>}/>
//         </Routes>
//         <Footer />
//       </Provider>
//     </Router>
//   );
// };
// export default App;

// // ReactDOM.render(<App />, document.getElementById('root'));
