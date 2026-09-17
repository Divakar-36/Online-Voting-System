package com.voting.backend.controller;

import com.voting.backend.dto.LoginRequest;
import com.voting.backend.dto.RegisterRequest;
import com.voting.backend.entity.User;
import com.voting.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request) {

        try {
            User user = authService.register(request);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    Map.of(
                            "message", "Registration successful",
                            "userId", user.getId()
                    )
            );

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request) {

        try {
            String token = authService.login(request);
            User user = authService.findByEmail(request.getEmail());

            return ResponseEntity.ok(
                    Map.of(
                            "message", "Login successful",
                            "token", token,
                            "role", user.getRole().name(),
                            "user", Map.of(
                                    "id", user.getId(),
                                    "firstName", user.getFirstName(),
                                    "lastName", user.getLastName(),
                                    "username", user.getUsername(),
                                    "email", user.getEmail()
                            )
                    )
            );

        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(
                    Map.of("message", e.getMessage())
            );
        }
    }
}