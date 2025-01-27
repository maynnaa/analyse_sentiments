package ma.formations.back.service;

import ma.formations.back.model.Produit;
import ma.formations.back.model.Review;
import ma.formations.back.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    public Optional<Review> findById(int id) {
        return reviewRepository.findById(id);
    }

    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    public void deleteById(int id) {
        reviewRepository.deleteById(id);
    }
    public List<Review> getReviewsByProduitId(int produitId) {
        return reviewRepository.findReviewsByProduitId(produitId);
    }

    public long countPositiveReviews() {
        return reviewRepository.countBySentiment("positif");
    }

    public long countNeutralReviews() {
        return reviewRepository.countBySentiment("neutre");
    }

    public long countNegativeReviews() {
        return reviewRepository.countBySentiment("negatif");}
}
