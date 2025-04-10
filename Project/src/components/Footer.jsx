
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          </div>
        {/* Copyright Section */}
        <div className="text-center mt-3">
          <p className="mb-0">&copy; {currentYear} policymarket.com. All Rights Reserved.</p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
