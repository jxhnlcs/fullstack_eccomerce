package com.example.eccomerce.controller;

import com.example.eccomerce.dto.AuthRequestDTO;
import com.example.eccomerce.dto.AuthResponseDTO;
import com.example.eccomerce.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO authRequest) throws ExecutionException, InterruptedException {
        AuthResponseDTO authResponse = authService.login(authRequest.getEmail(), authRequest.getPassword());
        return ResponseEntity.ok(authResponse);
    }
}