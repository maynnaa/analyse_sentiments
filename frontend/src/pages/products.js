import React, { useState } from 'react';
import Sidebar from '../components/sidebar'; // Ajustez le chemin si nécessaire
import Produits_tableau from '../components/produit'; // Ajustez le chemin si nécessaire
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="d-flex">
      {/* Sidebar à gauche */}
      <Sidebar />

      {/* Contenu principal */}
      <div
        className="d-flex flex-column flex-grow-1 align-items-center"
        style={{
          marginLeft: '100px',
          height: '100vh',
          paddingRight: '90px',
        }}
      >
        {/* Barre de recherche */}
        <div className="mb-1 w-100" style={{ maxWidth: '600px', marginTop: '20px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ fontSize: '14px', padding: '8px' }}
          />
        </div>

        {/* Tableau des produits */}
        <Produits_tableau searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Product;
