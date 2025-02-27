package com.example.eccomerce.service;

import com.example.eccomerce.dto.AuthResponseDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class AuthService {

    private final String FIREBASE_API_KEY = "AIzaSyDVT3kHCSSWJzlmoiY87wB-6SLfrwWXhEk";

    public AuthResponseDTO login(String email, String password) {
        try {
            String url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + FIREBASE_API_KEY;
            String requestBody = "{ \"email\": \"" + email + "\", \"password\": \"" + password + "\", \"returnSecureToken\": true }";

            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonNode = objectMapper.readTree(response.body());

                String idToken = jsonNode.get("idToken").asText();
                String refreshToken = jsonNode.get("refreshToken").asText();

                return new AuthResponseDTO(idToken, refreshToken);
            } else {
                throw new RuntimeException("Erro ao autenticar usuário: " + response.body());
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao autenticar: " + e.getMessage());
        }
    }

    public String verifyToken(String idToken) throws FirebaseAuthException {
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
        return decodedToken.getUid();
    }
}