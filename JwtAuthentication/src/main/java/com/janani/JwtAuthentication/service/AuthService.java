package com.janani.JwtAuthentication.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.janani.JwtAuthentication.exception.UserNotFoundException;
import com.janani.JwtAuthentication.exception.InvalidCredentialsException;
import com.janani.JwtAuthentication.exception.DuplicateUserException;
import com.janani.JwtAuthentication.model.Role;
import com.janani.JwtAuthentication.model.User;
import com.janani.JwtAuthentication.repository.UserRepository;
import com.janani.JwtAuthentication.util.JwtUtils;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    public String register(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new DuplicateUserException("Username already exists.");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new DuplicateUserException("Email already exists.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
     // Assign a default role if none is provided
        if (user.getRole() == null) {
            user.setRole(Role.USER); // Default role
        }
        userRepository.save(user);

        return "User registered successfully!";
    }

    public String login(String username, String password) {
        log.info("Searching for user with username: {}", username);

        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            log.error("User not found: {}", username);
            throw new UserNotFoundException("User not registered. Please sign up first.");
        }

        if (!passwordEncoder.matches(password, user.get().getPassword())) {
            log.error("Invalid password for user: {}", username);
            throw new InvalidCredentialsException("Invalid username or password.");
        }

        log.info("User authenticated successfully: {}", username);

        // Generate token
        String token = jwtUtils.generateToken(username, user.get().getEmail(), user.get().getRole().name());
        log.info("Token generated successfully for user: {}", username);
        return token;
    }
    
    public boolean validateToken(String token) {
        return jwtUtils.validateToken(token);  // Delegate to JwtUtils for validation
    }


    public Role getUserRole(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return user.getRole(); // Directly return the role as a string
    }
    
    public String refreshToken(String oldToken) {
        String username = jwtUtils.extractUsername(oldToken);
        // Generate a new token with only the username
        return jwtUtils.generateToken(username);
    }
    
    public Role getRoleFromToken(String token) {
        return jwtUtils.extractRoleFromToken(token);
    }



}
