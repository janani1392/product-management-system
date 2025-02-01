package com.janani.JwtAuthentication.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import com.janani.JwtAuthentication.model.Role;


@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;

    @NotEmpty(message = "Username is required")
    @Indexed(unique = true)
    private String username;

    @NotEmpty(message = "Password is required")
    private String password;

    @NotEmpty(message = "Email is required")
    @Email(message = "Invalid email format")
    @Indexed(unique = true) // Ensure unique email addresses in the database
    private String email;

    //private String role= "USER"; // e.g., "ADMIN" or "USER"
    private Role role = Role.USER; // Default role is USER
}
