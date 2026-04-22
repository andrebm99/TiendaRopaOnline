package com.store.spring.app.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.store.spring.app.Interface.UserInterface;
import com.store.spring.app.Models.User;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@Tag(name = "Usuarios", description = "Endpoints para la gestión de usuarios (Admin, Vendedor, Cliente).")
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserInterface userInterface;

    public UserController(UserInterface userInterface) {
        this.userInterface = userInterface;
    }

    @GetMapping
    @Operation(summary = "Listar Usuarios", description = "Obtener todos los usuarios registrados en el negocio.")
    public ResponseEntity<List<User>> getAll() {
        try {
            List<User> users = userInterface.getAllUsers();
            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    @Operation(summary = "Crear Usuario", description = "Registrar un nuevo usuario asignándole un rol.")
    public ResponseEntity<User> create(@RequestBody User user) {
        try {
            User newUser = userInterface.createUser(user);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar Usuario", description = "Eliminar un usuario por su ID.")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id) {
        try {
            boolean isDeleted = userInterface.deleteUser(id);
            if (!isDeleted) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}