# Usando OpenJDK 17
FROM openjdk:17-jdk

# Criando diretório da aplicação
WORKDIR /app

# Copiando o JAR gerado
COPY target/*.jar app.jar

# Expondo a porta usada pelo Spring Boot
EXPOSE 8080

# Rodando a aplicação
CMD ["java", "-jar", "app.jar"]
