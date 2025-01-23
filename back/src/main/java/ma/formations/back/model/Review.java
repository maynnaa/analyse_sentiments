package ma.formations.back.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "Review")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Review {
    @Id
    int id_review;
    String content;
    LocalDate date;
    String sentiment;

    @ManyToOne
    Produit produit;

}
