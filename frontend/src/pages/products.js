import React from 'react';
import Sidebar from '../components/sidebar'; // Adjust the path as needed
import Produits_tableau from '../components/produit'; // Adjust the path as needed
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = () => {
  return (
    <div className="d-flex">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content */}
      <div
        className="d-flex flex-grow-1 align-items-center"
        style={{
          marginLeft: '100px',
          height: '100vh',
          paddingRight: '90px',
        }}
      >
        {/* Products Table */}
        <Produits_tableau />
      </div>
    </div>
  );
};

export default Product;
