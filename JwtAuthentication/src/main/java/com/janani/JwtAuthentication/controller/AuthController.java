package com.janani.JwtAuthentication.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.janani.JwtAuthentication.exception.DuplicateUserException;
import com.janani.JwtAuthentication.exception.InvalidCredentialsException;
import com.janani.JwtAuthentication.exception.UserNotFoundException;
import com.janani.JwtAuthentication.model.LoginRequest;
import com.janani.JwtAuthentication.model.Role;
import com.janani.JwtAuthentication.model.User;
import com.janani.JwtAuthentication.service.AuthService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody User user) {
        try {
            if (user.getUsername() == null || user.getPassword() == null) {
                throw new IllegalArgumentException("Username and password cannot be null.");
            }
            String result = authService.register(user);
            Map<String, String> response = new HashMap<>();
            response.put("message", result);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (DuplicateUserException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        } catch (IllegalArgumentException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "An unexpected error occurred.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        try {
            String token = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
            System.out.println("Generated token: " + token);

            // Fetch user role
            Role role = authService.getUserRole(loginRequest.getUsername());
            System.out.println("Fetched role for user: " + role);

            // Set the token as a cookie
            ResponseCookie cookie = ResponseCookie.from("auth_token", token)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60) // 1 week
                    .sameSite("Strict")
                    .build();
            
            System.out.println("Generated cookie: " + cookie);

            // Return token and role
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(Map.of("message", "Login successful", "role", role));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "An unexpected error occurred"));
        }
    }
    
    
    @GetMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyToken(
            @CookieValue(name = "auth_token", required = false) String token) {
        try {
            if (token == null || token.isEmpty()) {
            	 System.out.println("token in /verify method:"+token);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No token provided"));
            }

            boolean isValid = authService.validateToken(token);
            if (!isValid) {
                throw new IllegalArgumentException("Token is invalid or expired");
            }

            // Retrieve user details from the token
            Role role = authService.getRoleFromToken(token);  // Get the role as a Role enum
            return ResponseEntity.ok(Map.of("message", "Token is valid", "role", role));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", e.getMessage()));
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("auth_token", null)
                .httpOnly(true)
                .secure(false) // Use true if HTTPS
                .path("/")
                .maxAge(0) // Expire immediately
                .sameSite("Strict")
                .build();
        
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAuthToken(@CookieValue(name = "auth_token", required = false) String token) {
        try {
            if (token == null || token.isEmpty()) {
                throw new IllegalArgumentException("No token provided");
            }

            // Validate the existing token
            boolean isValid = authService.validateToken(token);
            if (!isValid) {
                throw new IllegalArgumentException("Invalid or expired token");
            }

            // Generate a new token
            String newToken = authService.refreshToken(token);

            // Set the new token as a cookie
            ResponseCookie cookie = ResponseCookie.from("auth_token", newToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60) // 7 days
                    .sameSite("Strict")
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(Map.of("message", "Token refreshed successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Unable to refresh token: " + e.getMessage()));
        }
    }

}
