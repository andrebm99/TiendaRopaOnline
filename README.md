# TIENDA DE ROPA - DESARROLLO WEB INTEGRADO

### LINK DONDE CORRE EL PROYECTO

URL que nos manda a Swagger: 

http://localhost:8080/swagger

### Tecnologías implementadas

- SpringBoot
- MySQL
- Postman
- Swagger

### Configuración del application.properties

1) Debemos crear el `application.properties` en la siguiente ruta: 
    src/main/resources/application.properties

2) Debemos agregar la siguiente configuracion para que el proyecto funcione:

```application.properties
    spring.application.name=app

    server.port=8080

    logging.file.name=logs/app.log
    logging.logback.rollingpolicy.max-file-size=20MB

    spring.datasource.url=jdbc:mysql://localhost:3306/desarrollo
    spring.datasource.username=usuario
    spring.datasource.password=contraseña
    spring.jpa.hibernate.ddl-auto=update

    spring.jpa.generate-ddl=false
    spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
    spring.jpa.show-sql=false

    springdoc.swagger-ui.path=/swagger
    springdoc.api-docs.path=/api-docs
```

3) Para ello debemos crear la base de datos `desarrollo`
   
```sql
CREATE DATABASE IF NOT EXISTS desarrollo;
```