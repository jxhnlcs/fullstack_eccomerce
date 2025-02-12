# Etapa 1: Construir o JAR com Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar apenas os arquivos necessários para a compilação
COPY backend/pom.xml ./
RUN mvn dependency:go-offline  # Baixar dependências antes de copiar o código-fonte

# Copiar o código-fonte agora
COPY backend/src ./src

# Construir o JAR
RUN mvn clean package -DskipTests

# Etapa 2: Rodar o JAR com OpenJDK 17
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copiar o JAR gerado na etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Expor a porta do Spring Boot
EXPOSE 8080

# Rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]