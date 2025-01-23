import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Produits_tableau = ({ searchQuery }) => {
  const [products, setProducts] = useState([]); // État pour stocker les produits
  const [showModal, setShowModal] = useState(false); // État pour afficher/masquer le modal
  const [showEditModal, setShowEditModal] = useState(false); // État pour le modal d'édition
  const [selectedProduct, setSelectedProduct] = useState(null); // Produit sélectionné
  const [selectedProductReviews, setSelectedProductReviews] = useState([]); // Avis du produit sélectionné

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

  const handleShowReviews = (reviews) => {
    setSelectedProductReviews(reviews);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleShowEditModal = (product) => {
    setSelectedProduct({ ...product }); // Copie pour éviter la modification directe
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
        style={{ maxHeight: "450px", overflowY: "scroll", marginTop: "40px" }}
      >
        <table className="table table-hover table-bordered shadow-sm rounded">
          <thead className="table-light sticky-top">
            <tr>
              <th scope="col">Product & Title</th>
              <th scope="col">Categories</th>
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
                      onClick={() => handleShowReviews(product.reviews || [])}
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

      {/* Modal pour l'édition */}
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
                  <div className="mb-3">
                    <label>Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="image_produit"
                      value={selectedProduct.image_produit}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseEditModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveChanges}
                >
                  Save Changes
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
