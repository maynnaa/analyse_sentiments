package ma.formations.back.repository;

import ma.formations.back.model.Produit;
import ma.formations.back.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    @Query("SELECT r FROM Review r WHERE r.produit.id_produit = :produitId")
    List<Review> findReviewsByProduitId(@Param("produitId") int produitId);}
