package com.example.eccomerce.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        FirebaseOptions options;

        // Primeiro, tenta carregar do ambiente (Render)
        String firebaseCredentials = System.getenv("FIREBASE_CREDENTIALS");

        if (firebaseCredentials != null && !firebaseCredentials.isEmpty()) {
            System.out.println("🔹 Carregando credenciais do Firebase a partir da variável de ambiente...");
            options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(
                            new ByteArrayInputStream(firebaseCredentials.getBytes(StandardCharsets.UTF_8))
                    ))
                    .build();
        } else {
            // Se a variável de ambiente não existir, usa o arquivo local
            File file = new File("src/main/resources/serviceAccountKey.json");
            if (!file.exists()) {
                throw new IllegalStateException("Erro: Credenciais do Firebase não encontradas! Defina a variável FIREBASE_CREDENTIALS ou adicione serviceAccountKey.json.");
            }

            System.out.println("🖥️ Carregando credenciais do Firebase a partir do arquivo local...");
            options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(new FileInputStream(file)))
                    .build();
        }

        return FirebaseApp.initializeApp(options);
    }
}