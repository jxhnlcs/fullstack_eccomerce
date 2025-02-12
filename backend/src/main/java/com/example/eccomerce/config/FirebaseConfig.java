package com.example.eccomerce.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        FirebaseOptions options;

        String firebaseCredentials = System.getenv("FIREBASE_CREDENTIALS");

        if (firebaseCredentials != null && !firebaseCredentials.isEmpty()) {
            System.out.println("🔹 Carregando credenciais do Firebase a partir da variável de ambiente...");
            options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(
                            new ByteArrayInputStream(firebaseCredentials.getBytes(StandardCharsets.UTF_8))))
                    .build();
        } else {
            File file = new File("src/main/resources/serviceAccountKey.json");
            if (!file.exists()) {
                throw new IllegalStateException(
                        "❌ ERRO: Credenciais do Firebase não encontradas! Defina FIREBASE_CREDENTIALS no ambiente ou adicione serviceAccountKey.json.");
            }

            System.out.println("🖥️ Carregando credenciais do Firebase a partir do arquivo local...");
            options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(new FileInputStream(file)))
                    .build();
        }

        List<FirebaseApp> firebaseApps = FirebaseApp.getApps();
        if (firebaseApps.isEmpty()) {
            return FirebaseApp.initializeApp(options);
        } else {
            return firebaseApps.get(0);
        }
    }

    @Bean
    public Firestore firestore(FirebaseApp firebaseApp) {
        return FirestoreClient.getFirestore(firebaseApp);
    }
}