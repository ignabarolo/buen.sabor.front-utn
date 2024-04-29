package com.example.Practicas.model;

import jakarta.persistence.*;
import lombok.Data;
import java.io.Serializable;

@MappedSuperclass
@Data //Getters and Setters
public class Base implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
