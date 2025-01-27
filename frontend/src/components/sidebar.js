import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogout = () => {
    // Handle logout logic here (e.g., clearing user data, tokens)
    navigate('/'); // Redirect to the homepage
  };

  return (
    <div className="d-flex flex-column justify-content-between" style={{ width: '250px', height: '100vh', backgroundColor: '#2c3e50', color: 'white', padding: '20px' }}>
      <div>
        <h4 className="text-center mb-4">ShopMe</h4>
        <ul className="list-unstyled">
          <li>
            <Link to="/dashboard" className="d-block py-2 text-white" style={{ textDecoration: 'none' }}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/products" className="d-block py-2 text-white" style={{ textDecoration: 'none' }}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/customers" className="d-block py-2 text-white" style={{ textDecoration: 'none' }}>
              Customers
            </Link>
          </li>
          <li>
            <Link to="/orders" className="d-block py-2 text-white" style={{ textDecoration: 'none' }}>
              Orders
            </Link>
          </li>
          <li>
            <Link to="/refund" className="d-block py-2 text-white" style={{ textDecoration: 'none' }}>
              Refund
            </Link>
          </li>
          <li>
            <Link to="/apps" className="d-block py-2 text-white" style={{ textDecoration: 'none' }}>
              Apps
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <button className="btn btn-danger w-100 mt-4" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
