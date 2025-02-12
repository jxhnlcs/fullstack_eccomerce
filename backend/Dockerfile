# Etapa 1: Construir o JAR com Maven
FROM maven:3.8.6-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa 2: Rodar o JAR com OpenJDK 17
FROM openjdk:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Expor porta do Spring Boot
EXPOSE 8080

# Executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]