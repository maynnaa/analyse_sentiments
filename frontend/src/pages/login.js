import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const navigate = useNavigate(); // Hook pour la navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérification de l'email et du mot de passe (par exemple, simple validation)
    if (email && password) {
      // Naviguer vers la page des produits après une connexion réussie
      navigate('/dashboard');
    } else {
      alert("Veuillez entrer un email et un mot de passe.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="card p-4 shadow-lg" style={{ width: '400px', borderRadius: '15px' }}>
        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
            alt="Commerce Logo"
            style={{ width: '120px', borderRadius: '10px' }}
          />
        </div>

        {/* Titre */}
        <h4 className="text-center mb-4" style={{ color: '#333', fontWeight: 'bold' }}>
          Bienvenue dans notre boutique
        </h4>
        <p className="text-center text-muted" style={{ fontSize: '14px' }}>
          Connectez-vous pour accéder à votre compte
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          {/* Champ Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-end" style={{ fontWeight: '500' }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Entrez votre email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-end" style={{ fontWeight: '500' }}>
              Mot de passe
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Entrez votre mot de passe"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Bouton de connexion */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" style={{ fontWeight: 'bold' }}>
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
