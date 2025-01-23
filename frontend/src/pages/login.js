import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Connexion réussie : naviguer vers le tableau de bord
        navigate('/dashboard');
      }
    } catch (error) {
      // Gestion des erreurs
      if (error.response) {
        // Si le back-end a renvoyé une erreur
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="card p-4 shadow-lg" style={{ width: '400px', borderRadius: '15px' }}>
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
            alt="Commerce Logo"
            style={{ width: '120px', borderRadius: '10px' }}
          />
        </div>
        <h4 className="text-center mb-4" style={{ color: '#333', fontWeight: 'bold' }}>
          Bienvenue dans notre boutique
        </h4>
        <p className="text-center text-muted" style={{ fontSize: '14px' }}>
          Connectez-vous pour accéder à votre compte
        </p>
        <form onSubmit={handleSubmit}>
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
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
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
