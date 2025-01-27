import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Title);

const Dash = () => {
  const [reviewCounts, setReviewCounts] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  useEffect(() => {
    const fetchReviewCounts = async () => {
      try {
        const positiveRes = await axios.get('http://localhost:8080/reviews/count/positive');
        const neutralRes = await axios.get('http://localhost:8080/reviews/count/neutral');
        const negativeRes = await axios.get('http://localhost:8080/reviews/count/negative');

        console.log('Positive Reviews:', positiveRes.data);
        console.log('Neutral Reviews:', neutralRes.data);
        console.log('Negative Reviews:', negativeRes.data);

        setReviewCounts({
          positive: positiveRes.data,
          neutral: neutralRes.data,
          negative: negativeRes.data,
        });
      } catch (error) {
        console.error('Error fetching review counts:', error);
      }
    };

    fetchReviewCounts();
  }, []);

  const totalReviews =
    reviewCounts.positive + reviewCounts.neutral + reviewCounts.negative;

  const positivePercentage = totalReviews
    ? ((reviewCounts.positive / totalReviews) * 100).toFixed(1)
    : 0;
  const neutralPercentage = totalReviews
    ? ((reviewCounts.neutral / totalReviews) * 100).toFixed(1)
    : 0;
  const negativePercentage = totalReviews
    ? ((reviewCounts.negative / totalReviews) * 100).toFixed(1)
    : 0;

  const pieData = {
    labels: ['Positifs', 'Neutres', 'Négatifs'],
    datasets: [
      {
        data: [reviewCounts.positive, reviewCounts.neutral, reviewCounts.negative],
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
              <Pie data={pieData} options={pieOptions} />
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
