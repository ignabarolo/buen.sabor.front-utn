package com.example.Practicas.controller;


import com.example.Practicas.model.Persona;
import com.example.Practicas.service.PersonaServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "api/personas")
public class PersonaController extends BaseControllerImpl<Persona, PersonaServiceImpl>{

    private PersonaServiceImpl service;
    public PersonaController(PersonaServiceImpl service) {
        super(service);
    }
}

