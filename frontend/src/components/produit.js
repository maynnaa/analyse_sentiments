import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Produits_tableau = ({ searchQuery }) => {
  const [products, setProducts] = useState([]); // State to store products
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [showReviewsModal, setShowReviewsModal] = useState(false); // State to toggle reviews view

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
      setReviews(response.data); // Mettre à jour les avis
      setShowReviewsModal(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des avis :", error);
      toast.error("Impossible de charger les avis pour ce produit.");
    }
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
                  {/* Reviews summary placeholder, can be updated later */}
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

      {/* Modal for reviews */}
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
                  <ul>
                    {reviews.map((review) => (
                      <li key={review.id_review}>
                        <p>{review.content}</p> {/* Afficher uniquement le champ content */}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Aucun avis disponible pour ce produit.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
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
                <h5 className="modal-title">Modifier le produit</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseEditModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label>ID Produit</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedProduct.id_produit}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label>Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nom_produit"
                      value={selectedProduct.nom_produit}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Catégorie</label>
                    <input
                      type="text"
                      className="form-control"
                      name="catégorie"
                      value={selectedProduct.catégorie}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      name="description_produit"
                      value={selectedProduct.description_produit}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveChanges}
                  >
                    Enregistrer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produits_tableau;
