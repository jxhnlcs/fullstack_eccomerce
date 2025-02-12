package com.example.eccomerce.controller;

import com.example.eccomerce.dto.ProductDTO;
import com.example.eccomerce.model.Product;
import com.example.eccomerce.service.ProductService;
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

    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();
            return ResponseEntity.ok(products);
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500)
                    .body("Erro ao buscar produtos: " + e.getMessage());
        }
    }

    @PostMapping("/products")
    public ResponseEntity<?> createProduct(@RequestBody ProductDTO productDTO) {
        try {
            Product product = productService.createProduct(productDTO);
            return ResponseEntity.ok(product);
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body("Erro ao salvar produto no Firestore: " + e.getMessage());
        }
    }
}