package com.example.Practicas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name="persona")
@Data //Getters and Setters
@NoArgsConstructor
@AllArgsConstructor
public class Persona extends Base{
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String adress;
    private Date birthdate;
}
