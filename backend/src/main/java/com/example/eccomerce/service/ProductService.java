package com.example.eccomerce.service;

import com.example.eccomerce.dto.ProductDTO;
import com.example.eccomerce.model.Product;
import com.example.eccomerce.repository.ProductRepository;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ProductService {

        @Autowired
        private ProductRepository productRepository;

        @Autowired
        private Firestore firestore;

        public Product createProduct(ProductDTO productDTO) throws ExecutionException, InterruptedException {
                Product product = new Product();
                product.setName(productDTO.getName());
                product.setDescription(productDTO.getDescription());
                product.setPrice(productDTO.getPrice());
                product.setStockQuantity(productDTO.getStockQuantity());

                product = productRepository.save(product);

                // Criar um documento no Firestore
                String documentId = "product-" + product.getId();
                WriteResult writeResult = firestore.collection("products").document(documentId).set(product).get();

                System.out.println("Produto salvo no Firestore! Atualizado em: " + writeResult.getUpdateTime());

                return product;
        }

        public List<Product> getAllProducts() throws ExecutionException, InterruptedException {
                List<Product> products = new ArrayList<>();

                // Buscar todos os documentos na coleção "products"
                firestore.collection("products").get().get().getDocuments().forEach(document -> {
                        Product product = document.toObject(Product.class);
                        products.add(product);
                });

                return products;
        }
}