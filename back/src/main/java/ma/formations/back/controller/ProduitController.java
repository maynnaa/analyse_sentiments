package ma.formations.back.controller;

import ma.formations.back.model.Produit;
import ma.formations.back.service.ProduitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produits")
@CrossOrigin(origins = "http://localhost:3000")
public class ProduitController {

    private final ProduitService produitService;

    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }

    @GetMapping
    public List<Produit> getAllProduits() {
        return produitService.getAllProduits();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable int id) {
        Produit produit = produitService.getProduitById(id);
        return ResponseEntity.ok(produit);
    }

    @PostMapping
    public ResponseEntity<Produit> createProduit(@RequestBody Produit produit) {
        Produit savedProduit = produitService.createProduit(produit);
        return ResponseEntity.ok(savedProduit);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable int id) {
        produitService.deleteProduit(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable int id, @RequestBody Produit updatedProduit) {
        Produit produit = produitService.getProduitById(id); // Vérifie si le produit existe
        if (produit == null) {
            return ResponseEntity.notFound().build();
        }
        updatedProduit.setId_produit(id); // S'assurer que l'ID reste le même
        Produit savedProduit = produitService.updateProduit(updatedProduit);
        return ResponseEntity.ok(savedProduit);
    }


}