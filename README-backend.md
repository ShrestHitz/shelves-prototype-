# Shelves Backend (Spring Boot + MySQL)

This folder contains a minimal Spring Boot backend for the Shelves prototype. It exposes simple REST endpoints for assignments and learning materials and uses MySQL as the data store.

Quick overview
- Java 17, Spring Boot
- Endpoints:
  - GET /api/assignments
  - POST /api/assignments
  - GET /api/assignments/{id}
  - PUT /api/assignments/{id}
  - DELETE /api/assignments/{id}
  - GET /api/materials
  - POST /api/materials
  - GET /api/materials/{id}
  - PUT /api/materials/{id}
  - DELETE /api/materials/{id}

Configuration
1. Install and run MySQL (or use an existing instance).
2. Edit `src/main/resources/application.properties` and set `spring.datasource.username` and `spring.datasource.password`.
3. The default JDBC URL creates a database named `shelvesdb` if it doesn't exist. Change it if you prefer a different DB name.

Run locally
1. From PowerShell in this folder run:

   mvn -e -DskipTests package; java -jar target/shelves-backend-0.0.1-SNAPSHOT.jar

   or

   mvn spring-boot:run

Frontend integration
- The frontend (your static HTML files) can call the API endpoints at `http://localhost:8080/api/...`.
- CORS is enabled for all origins (development convenience). For production, restrict the allowed origins.

Notes and next steps
- Add validation and authentication for production readiness.
- Consider adding DTOs and mapping (MapStruct) if you want separation between persistence and API shapes.
- Add tests and Dockerfile if you want containerized deployment.
