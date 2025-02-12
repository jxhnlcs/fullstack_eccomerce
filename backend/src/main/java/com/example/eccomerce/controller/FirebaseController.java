package com.example.eccomerce.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class FirebaseController {

    @GetMapping("/hello")
    public String helloFirebase() {
        return "Conexão com Firebase funcionando!";
    }
}
