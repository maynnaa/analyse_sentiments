import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Produits_tableau = () => {
  const [showModal, setShowModal] = useState(false); // État pour afficher/masquer le modal

  // Fonction pour ouvrir le modal
  const handleShowModal = () => setShowModal(true);

  // Fonction pour fermer le modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container-fluid p-5">
      <div className="table-responsive">
        <table className="table table-hover table-bordered shadow-sm rounded">
          <thead className="table-light">
            <tr>
              <th scope="col">Product & Title</th>
              <th scope="col">Categories</th>
              <th scope="col">Reviews</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Product 1"
                  className="me-3 rounded-circle"
                  style={{ width: '50px', height: '50px' }}
                />
                <span>Smartphone X</span>
                <p className="text-muted mb-0">A high-end smartphone with exceptional performance.</p>
              </td>
              <td>Electronics</td>
              <td>
                Positive: 34.78%<br />
                Neutral: 8.70%<br />
                Negative: 56.52%
              </td>
              <td>
                <button className="btn btn-sm btn-danger me-2">Delete</button>
                <button className="btn btn-sm btn-secondary me-2">Edit</button>
                <button className="btn btn-sm btn-success" onClick={handleShowModal}>Reveal reviews</button>
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Product 2"
                  className="me-3 rounded-circle"
                  style={{ width: '50px', height: '50px' }}
                />
                <span>Laptop Pro</span>
                <p className="text-muted mb-0">A professional-grade laptop for work and play.</p>
              </td>
              <td>Electronics</td>
              <td>
                Positive: 0.0%<br />
                Neutral: 0.0%<br />
                Negative: 100.0%
              </td>
              <td>
                <button className="btn btn-sm btn-danger me-2">Delete</button>
                <button className="btn btn-sm btn-secondary me-2">Edit</button>
                <button className="btn btn-sm btn-success" onClick={handleShowModal}>Reveal reviews</button>
              </td>
            </tr>

            {/* Row 3 */}
            <tr>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Product 3"
                  className="me-3 rounded-circle"
                  style={{ width: '50px', height: '50px' }}
                />
                <span>Product 3</span>
                <p className="text-muted mb-0">Description of product 3.</p>
              </td>
              <td>Electronics</td>
              <td>
                Positive: 0.0%<br />
                Neutral: 0.0%<br />
                Negative: 100.0%
              </td>
              <td>
                <button className="btn btn-sm btn-danger me-2">Delete</button>
                <button className="btn btn-sm btn-secondary me-2">Edit</button>
                <button className="btn btn-sm btn-success" onClick={handleShowModal}>Reveal reviews</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }} aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Reviews Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              {/* Afficher les détails des avis ici */}
              <p>Here are the detailed reviews for the selected product...</p>
              <ul>
                <li>Review 1: Excellent product!</li>
                <li>Review 2: Good value for money.</li>
                <li>Review 3: Not satisfied with the performance.</li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produits_tableau;
