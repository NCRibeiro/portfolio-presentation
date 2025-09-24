# Usar imagem base do Java 17
FROM eclipse-temurin:17-jdk-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar todo o código
COPY . .

# Compilar o projeto com Maven
RUN ./mvnw clean package -DskipTests || mvn clean package -DskipTests

# Expor a porta correta (8091)
EXPOSE 8091

# Rodar o JAR gerado
CMD ["java", "-jar", "target/portfolio-presentation-0.0.1-SNAPSHOT.jar"]
