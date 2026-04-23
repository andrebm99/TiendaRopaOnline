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

import com.store.spring.app.Interface.RoleInterface;
import com.store.spring.app.Models.Role;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@Tag(name = "Roles", description = "Endpoints para la gestión de roles de usuario.")
@RestController
@RequestMapping("/api/role")
public class RoleController {

    private final RoleInterface roleInterface;

    public RoleController(RoleInterface roleInterface) {
        this.roleInterface = roleInterface;
    }

    @GetMapping
    @Operation(summary = "Listar Roles", description = "Obtener la lista de todos los roles disponibles.")
    public ResponseEntity<List<Role>> getAll() {
        try {
            List<Role> roles = roleInterface.getAllRoles();
            if (roles.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(roles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    @Operation(summary = "Crear Rol", description = "Registrar un nuevo rol en el sistema.")
    public ResponseEntity<Role> create(@RequestBody Role role) {
        try {
            Role newRole = roleInterface.createRole(role);
            return new ResponseEntity<>(newRole, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar Rol", description = "Eliminar un rol por su ID.")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id) {
        try {
            boolean isDeleted = roleInterface.deleteRole(id);
            if (!isDeleted) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}