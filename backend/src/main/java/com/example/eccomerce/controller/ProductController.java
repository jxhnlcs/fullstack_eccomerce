package com.example.eccomerce.controller;

import com.example.eccomerce.dto.ProductDTO;
import com.example.eccomerce.model.Product;
import com.example.eccomerce.service.AuthService;
import com.example.eccomerce.service.ProductService;
import com.example.eccomerce.exception.ProductNotFoundException;
import com.example.eccomerce.util.ApiResponse;
import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private AuthService authService;

    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();
            return ResponseEntity.ok(products);
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body(new ApiResponse("Erro ao buscar produtos: " + e.getMessage()));
        }
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable String id) {
        try {
            Product product = productService.getProductById(id);
            return ResponseEntity.ok(product);
        } catch (ProductNotFoundException e) {
            return ResponseEntity.status(404).body(new ApiResponse(e.getMessage()));
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body(new ApiResponse("Erro ao buscar produto: " + e.getMessage()));
        }
    }

    @PostMapping("/products")
    public ResponseEntity<?> createProduct(@RequestHeader("Authorization") String authToken,
            @RequestBody ProductDTO productDTO) {
        try {
            String userId = authService.verifyToken(authToken.replace("Bearer ", ""));
            Product product = productService.createProduct(productDTO, userId);
            return ResponseEntity.ok(product);
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(401).body(new ApiResponse("Token inválido ou expirado."));
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body(new ApiResponse("Erro ao salvar produto: " + e.getMessage()));
        }
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(
            @RequestHeader("Authorization") String authToken,
            @PathVariable String id,
            @RequestBody ProductDTO productDTO) {
        try {
            String userId = authService.verifyToken(authToken.replace("Bearer ", ""));
            Product updatedProduct = productService.updateProduct(id, productDTO, userId);
            return ResponseEntity.ok(updatedProduct);
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(401).body(new ApiResponse("Token inválido ou expirado."));
        } catch (ProductNotFoundException e) {
            return ResponseEntity.status(404).body(new ApiResponse(e.getMessage()));
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body(new ApiResponse("Erro ao atualizar produto: " + e.getMessage()));
        }
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok(new ApiResponse("Produto deletado com sucesso!"));
        } catch (ProductNotFoundException e) {
            return ResponseEntity.status(404).body(new ApiResponse(e.getMessage()));
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body(new ApiResponse("Erro ao deletar produto: " + e.getMessage()));
        }
    }

    @GetMapping("/products/user")
    public ResponseEntity<?> getProductsByUser(@RequestHeader("Authorization") String authToken) {
        try {
            String userId = authService.verifyToken(authToken.replace("Bearer ", "")); // Extrai o userId do token
            List<Product> products = productService.getProductsByUserId(userId);
            return ResponseEntity.ok(products);
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(401).body(new ApiResponse("Token inválido ou expirado."));
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body(new ApiResponse("Erro ao buscar produtos: " + e.getMessage()));
        }
    }

}