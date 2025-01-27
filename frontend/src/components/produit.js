import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Produits_tableau = ({ searchQuery }) => {
  const [products, setProducts] = useState([]); // État pour les produits
  const [showEditModal, setShowEditModal] = useState(false); // Modal d'édition
  const [selectedProduct, setSelectedProduct] = useState(null); // Produit sélectionné
  const [reviews, setReviews] = useState([]); // État pour les avis
  const [reviewStats, setReviewStats] = useState({}); // Statistiques des avis
  const [showReviewsModal, setShowReviewsModal] = useState(false); // Modal des avis

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/produits");
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/produits/${id}`);
      setProducts(products.filter((product) => product.id_produit !== id));
      toast.success("Produit supprimé avec succès!");
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      toast.error("Une erreur s'est produite lors de la suppression.");
    }
  };

  const handleShowEditModal = (product) => {
    setSelectedProduct({ ...product });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:8080/produits/${selectedProduct.id_produit}`,
        selectedProduct
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id_produit === selectedProduct.id_produit
            ? { ...selectedProduct }
            : product
        )
      );
      toast.success("Produit modifié avec succès!");
      handleCloseEditModal();
    } catch (error) {
      console.error("Erreur lors de la modification du produit:", error);
      toast.error("Une erreur s'est produite lors de la sauvegarde.");
    }
  };

  // Récupérer les avis relatifs à un produit
  const handleShowReviews = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/reviews/produit/${productId}`
      );
      const reviewsData = response.data;
      setReviews(reviewsData);

      setShowReviewsModal(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des avis :", error);
      toast.error("Impossible de charger les avis pour ce produit.");
    }
  };

  // Calcul des statistiques des avis
  const calculateReviewStats = (reviews) => {
    const totalReviews = reviews.length;
    let positiveCount = 0;
    let neutralCount = 0;
    let negativeCount = 0;

    reviews.forEach((review) => {
      switch (review.sentiment) {
        case "positif":
          positiveCount++;
          break;
        case "neutre":
          neutralCount++;
          break;
        case "negatif":
          negativeCount++;
          break;
        default:
          break;
      }
    });

    return {
      positive: totalReviews > 0 ? (positiveCount / totalReviews) * 100 : 0,
      neutral: totalReviews > 0 ? (neutralCount / totalReviews) * 100 : 0,
      negative: totalReviews > 0 ? (negativeCount / totalReviews) * 100 : 0,
    };
  };

  // Fermer la modal des avis
  const handleCloseReviewsModal = () => {
    setShowReviewsModal(false);
    setReviews([]); // Réinitialiser les avis lorsque la modal est fermée
  };

  const filteredProducts = products.filter((product) => {
    const normalizedProductName = product.nom_produit
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const normalizedSearchQuery = searchQuery
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    return normalizedProductName.includes(normalizedSearchQuery);
  });

  // Calculer les statistiques pour chaque produit
  useEffect(() => {
    const stats = {};
    products.forEach((product) => {
      axios
        .get(`http://localhost:8080/reviews/produit/${product.id_produit}`)
        .then((response) => {
          const reviewsData = response.data;
          stats[product.id_produit] = calculateReviewStats(reviewsData);
          setReviewStats({ ...stats });
        });
    });
  }, [products]);

  return (
    <div className="container-fluid p-3">
      <ToastContainer />
      <div
        className="table-responsive"
        style={{
          maxHeight: "450px",
          overflowY: "scroll",
          marginTop: "40px",
          scrollbarWidth: "none", /* Firefox */
          msOverflowStyle: "none", /* Internet Explorer 10+ */
        }}
      >
        <table className="table table-hover table-bordered shadow-sm rounded">
          <thead className="table-light sticky-top">
            <tr>
              <th scope="col">Product & Title</th>
              <th scope="col">Categories</th>
              <th scope="col">Reviews Summary</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id_produit}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={product.image_produit}
                      alt={product.nom_produit}
                      className="me-3 rounded-circle"
                      style={{ width: "60px", height: "60px" }}
                    />
                    <p className="text-muted mb-0 ms-3 fw-bold">{product.nom_produit}</p>
                  </div>
                  <p className="text-muted mb-0">{product.description_produit}</p>
                </td>
                <td>{product.catégorie}</td>
                <td>
                  {/* Affichage des statistiques des avis */}
                  {reviewStats[product.id_produit] ? (
                    <>
                      <p>Positif : {reviewStats[product.id_produit].positive.toFixed(1)}%</p>
                      <p>Neutre : {reviewStats[product.id_produit].neutral.toFixed(1)}%</p>
                      <p>Négatif : {reviewStats[product.id_produit].negative.toFixed(1)}%</p>
                    </>
                  ) : (
                    <p>Aucun avis</p>
                  )}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteProduct(product.id_produit)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleShowEditModal(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleShowReviews(product.id_produit)}
                    >
                      Reveal Reviews
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal pour afficher uniquement les contenus des avis */}
      {showReviewsModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-labelledby="reviewsModal"
          aria-hidden="false"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Avis du Produit</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseReviewsModal}
                ></button>
              </div>
              <div className="modal-body">
                {reviews.length > 0 ? (
                  <div>
                    {reviews.map((review) => (
                      <div key={review.id_review} className="review-item mb-3">
                        <p>{review.content}</p> {/* Afficher uniquement le contenu de l'avis */}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Aucun avis disponible pour ce produit.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseReviewsModal}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour éditer un produit */}
      {showEditModal && selectedProduct && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-labelledby="editModal"
          aria-hidden="false"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Édition du Produit</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseEditModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="nom_produit" className="form-label">
                    Nom du produit
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nom_produit"
                    name="nom_produit"
                    value={selectedProduct.nom_produit}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description_produit" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description_produit"
                    name="description_produit"
                    rows="3"
                    value={selectedProduct.description_produit}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="catégorie" className="form-label">
                    Catégorie
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="catégorie"
                    name="catégorie"
                    value={selectedProduct.catégorie}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Ajoutez d'autres champs à modifier si nécessaire */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseEditModal}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveChanges}
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produits_tableau;
