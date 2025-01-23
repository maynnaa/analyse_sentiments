import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2'; // Changement de Doughnut à Pie

// Enregistrement des éléments nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Title);

const Dash = () => {
  const totalReviews = 1000;
  const positive = 600;
  const neutral = 250;
  const negative = 150;

  const positivePercentage = ((positive / totalReviews) * 100).toFixed(1);
  const neutralPercentage = ((neutral / totalReviews) * 100).toFixed(1);
  const negativePercentage = ((negative / totalReviews) * 100).toFixed(1);

  const pieData = {
    labels: ['Positifs', 'Neutres', 'Négatifs'],
    datasets: [
      {
        data: [positive, neutral, negative],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        hoverBackgroundColor: ['#45A049', '#FFB300', '#E53935'],
        borderWidth: 3,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };

  // Données pour le graphique linéaire (évolution des avis)
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Avis Positifs',
        data: [120, 180, 200, 150, 250, 300, 350],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Avis Neutres',
        data: [50, 60, 100, 90, 80, 130, 140],
        borderColor: '#FFC107',
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Avis Négatifs',
        data: [30, 50, 80, 100, 90, 70, 50],
        borderColor: '#F44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h4 className="text-center mb-4">Répartition des avis</h4>
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex justify-content-center" style={{ height: '300px' }}>
              <Pie data={pieData} options={pieOptions} /> {/* Remplacement de Doughnut par Pie */}
            </div>
            <ul className="list-group mt-4">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Avis positifs
                <span className="badge bg-success">{positivePercentage}%</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Avis neutres
                <span className="badge bg-warning">{neutralPercentage}%</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Avis négatifs
                <span className="badge bg-danger">{negativePercentage}%</span>
              </li>
            </ul>
          </div>

          {/* Graphique d'évolution sous le tableau */}
          <div className="col-md-6 mt-4">
            <h5 className="text-center mb-4">Évolution des avis</h5>
            <Line data={lineData} options={lineOptions} style={{ height: '200px', width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
