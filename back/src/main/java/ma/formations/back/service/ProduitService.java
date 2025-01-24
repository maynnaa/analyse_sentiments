package ma.formations.back.service;

import ma.formations.back.model.Produit;
import ma.formations.back.repository.ProduitRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {
    private final ProduitRepository produitRepository;

    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }
    public Produit getProduitById(int id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé avec l'id : " + id));
    }
    public Produit createProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    public void deleteProduit(int id) {
        produitRepository.deleteById(id);
    }

    public Produit updateProduit(Produit produit) {
        return produitRepository.save(produit);
    }


}
