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

        // 1️⃣ Tenta carregar as credenciais do ambiente (Render)
        String firebaseCredentials = System.getenv("FIREBASE_CREDENTIALS");

        if (firebaseCredentials != null && !firebaseCredentials.isEmpty()) {
            System.out.println("🔹 Carregando credenciais do Firebase a partir da variável de ambiente...");
            options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(
                            new ByteArrayInputStream(firebaseCredentials.getBytes(StandardCharsets.UTF_8))
                    ))
                    .build();
        } else {
            // 2️⃣ Se não existir no ambiente, tenta carregar do arquivo local (para desenvolvimento)
            File file = new File("src/main/resources/serviceAccountKey.json");
            if (!file.exists()) {
                throw new IllegalStateException("❌ ERRO: Credenciais do Firebase não encontradas! Defina FIREBASE_CREDENTIALS no ambiente ou adicione serviceAccountKey.json.");
            }

            System.out.println("🖥️ Carregando credenciais do Firebase a partir do arquivo local...");
            options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(new FileInputStream(file)))
                    .build();
        }

        return FirebaseApp.initializeApp(options);
    }
}