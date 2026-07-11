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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.store.spring.app.Interface.UserInterface;
import com.store.spring.app.Models.User;
import com.store.spring.app.Repositories.ContactRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "http://localhost:8080")
@Tag(name = "Usuarios", description = "Endpoints para la gestión de usuarios (Admin, Vendedor, Cliente).")
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final UserInterface userInterface;
    ContactRepository repository;

    public UserController(UserInterface userInterface, PasswordEncoder passwordEncoder) {
        this.userInterface = userInterface;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    @Operation(summary = "NUEVO USUARIO", description = "Registrar un nuevo usuario asignándole un rol.")
    public ResponseEntity<User> create(@RequestBody User user) {
        try {
            String encryptedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encryptedPassword);

            User newUser = userInterface.createUser(user);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    @Operation(summary = "LISTAR TODOS LOS USUARIOS", description = "Obtener todos los usuarios registrados en el negocio.")
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

    public String getMethodName(@RequestParam String param) {
        return new String();
    }

    @GetMapping("/{id}")
    @Operation(summary = "BUSCAR USUARIO", description = "Obtiene un usuario por su ID para ver su perfil.")
    public ResponseEntity<User> getById(@PathVariable("id") Integer id) {
        try {
            User user = userInterface.getUserById(id);
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "BUSCAR USUARIO POR CORREO", description = "Obtiene un usuario por su correo electrónico.")
    public ResponseEntity<User> getByEmail(@PathVariable("email") String email) {
        try {
            User user = userInterface.getAllUsers().stream()
                .filter(u -> u.getEmail().equalsIgnoreCase(email))
                .findFirst()
                .orElse(null);
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "ACTUALIZAR USUARIO", description = "Modifica los datos del perfil de un usuario existente.")
    public ResponseEntity<User> update(@PathVariable("id") Integer id, @RequestBody User user) {
        try {
            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                String encryptedPassword = passwordEncoder.encode(user.getPassword());
                user.setPassword(encryptedPassword);
            }

            User updatedUser = userInterface.updateUser(id, user);
            if (updatedUser == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "ELIMINAR USUARIO", description = "Eliminar un usuario por su ID.")
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