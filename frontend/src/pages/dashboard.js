import React from 'react';
import Sidebar from '../components/sidebar'; // Adjust the import path as needed
import Dash from '../components/dash'; // Adjust the import path as needed
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Dash />
      </div>
    </div>
  );
};

export default Dashboard;
