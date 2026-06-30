package com.store.spring.app.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;


    SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }
    

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Deshabilitamos CSRF para APIs REST
            .cors(cors -> {}) // Habilitar CORS si es necesario
            .authorizeHttpRequests(auth -> auth
                // Recursos públicos
                .requestMatchers("/css/**", "/js/**", "/img/**", "/images/**").permitAll()
                .requestMatchers("/", "/envios", "/como-comprar", "/catalogo", "/bolsa").permitAll()
                // Endpoints de autenticación
                .requestMatchers("/api/auth/**").permitAll()
                // Swagger
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/api-docs/**", "/swagger").permitAll()
                // Otros endpoints que desees dejar públicos temporalmente
                .requestMatchers("/api/productos/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET,"/api/role/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.POST,"/api/user").permitAll()
                .requestMatchers("/api/user/**").hasRole("ADMIN")
                .requestMatchers("/api/contact/**").permitAll()
                .requestMatchers("/api/pedidos/**").permitAll()
                // Todo lo demás requiere autenticación
                .anyRequest().authenticated()
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Aquí integramos tu filtro personalizado ANTES de la validación de usuario/contraseña
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}