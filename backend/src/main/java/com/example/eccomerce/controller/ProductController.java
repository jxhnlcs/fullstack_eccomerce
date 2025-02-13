package com.example.eccomerce.controller;

import com.example.eccomerce.dto.ProductDTO;
import com.example.eccomerce.model.Product;
import com.example.eccomerce.service.ProductService;
import com.example.eccomerce.exception.ProductNotFoundException;
import com.example.eccomerce.util.ApiResponse;
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
                    .body(new ApiResponse("❌ Erro ao buscar produtos: " + e.getMessage()));
        }
    }

    @PostMapping("/products")
    public ResponseEntity<?> createProduct(@RequestBody ProductDTO productDTO) {
        try {
            Product product = productService.createProduct(productDTO);
            return ResponseEntity.ok(product);
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body(new ApiResponse("Erro ao salvar produto: " + e.getMessage()));
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
}
