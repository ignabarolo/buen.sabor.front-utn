package com.example.Practicas.service;

import com.example.Practicas.model.Persona;
import com.example.Practicas.repository.PersonaRepository;
import org.springframework.stereotype.Service;


@Service
public class PersonaServiceImpl extends BaseServiceImpl<Persona, Long> implements PersonaService{

    private PersonaRepository personaRepository;
    public PersonaServiceImpl(PersonaRepository personaRepository) {
        super(personaRepository);
        this.personaRepository = personaRepository;
    }
}
