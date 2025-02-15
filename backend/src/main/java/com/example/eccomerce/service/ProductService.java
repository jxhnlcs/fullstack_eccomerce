package com.example.eccomerce.service;

import com.example.eccomerce.dto.ProductDTO;
import com.example.eccomerce.exception.ProductNotFoundException;
import com.example.eccomerce.model.Product;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.WriteResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class ProductService {

        @Autowired
        private Firestore firestore;

        public List<Product> getAllProducts() throws ExecutionException, InterruptedException {
                List<Product> products = new ArrayList<>();

                List<QueryDocumentSnapshot> documents = firestore.collection("products").get().get().getDocuments();

                for (QueryDocumentSnapshot document : documents) {
                        Product product = document.toObject(Product.class);
                        products.add(product);
                }

                return products;
        }

        public Product createProduct(ProductDTO productDTO) throws ExecutionException, InterruptedException {
                Product product = new Product();
                product.setName(productDTO.getName());
                product.setDescription(productDTO.getDescription());
                product.setPrice(productDTO.getPrice());
                product.setStockQuantity(productDTO.getStockQuantity());
                
                String documentId = UUID.randomUUID().toString();

                Map<String, Object> productData = new HashMap<>();
                productData.put("name", product.getName());
                productData.put("description", product.getDescription());
                productData.put("price", product.getPrice());
                productData.put("stockQuantity", product.getStockQuantity());

                WriteResult writeResult = firestore.collection("products").document(documentId).set(productData).get();

                System.out.println("Produto salvo no Firestore em: " + writeResult.getUpdateTime());

                return product;
        }

        public Product getProductById(String documentId) throws ExecutionException, InterruptedException {
                var document = firestore.collection("products").document(documentId).get().get();

                if (!document.exists()) {
                        throw new ProductNotFoundException("Produto com ID " + documentId + " não encontrado.");
                }

                return document.toObject(Product.class);
        }
}