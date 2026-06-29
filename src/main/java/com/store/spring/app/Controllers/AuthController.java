package com.store.spring.app.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import com.store.spring.app.DTO.AuthResponseDTO;
import com.store.spring.app.Models.LoginRequest;
import com.store.spring.app.Models.User;
import com.store.spring.app.Repositories.UserRepository;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    @Operation(summary = "LOGIN", description = "Iniciar sesión con email y contraseña")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(), loginRequest.getPassword())
                    );

            // Obtener detalles del usuario autenticado
            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            // Retornar un token estático de sesión simple
            String mockToken = "mock-session-token-for-" + user.getEmail();
            return ResponseEntity.ok(new AuthResponseDTO(mockToken));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }
}
