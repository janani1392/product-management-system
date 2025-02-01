package com.janani.JwtAuthentication.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.janani.JwtAuthentication.model.Role;

import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtils {

    private static final Logger log = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwt.secret}") // Use application.properties key
    private String jwtSecret;

    private final long jwtExpiration = 604800000; // 7 days in milliseconds
    
    

    /**
     * Generate a JWT token with username, email, and role as claims.
     */    
    
    public String generateToken(String username, String email, String role) {
        return Jwts.builder()
            .setSubject(username)
            .claim("email", email)
            .claim("role", role) // Include the role in the token
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
            .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()), SignatureAlgorithm.HS512)
            .compact();
    }

    // Overloaded method to generate a token with only the username
    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
            .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()), SignatureAlgorithm.HS512)
            .compact();
    }
    


    /**
     * Generate a token specifically for refreshing.
     */
    public String generateRefreshToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration)) // Optional: Can use a longer expiration for refresh tokens
            .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()), SignatureAlgorithm.HS512)
            .compact();
    }

    /**
     * Extract the username from the JWT token.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Generic method to extract any claim from the JWT token.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extract all claims from the JWT token.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes())) // Use the correct key
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Validate the JWT token.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes())) // Use the correct key
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            log.error("Token validation error: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Check if the token is expired.
     */
    public boolean isTokenExpired(String token) {
        Date expiration = extractClaim(token, Claims::getExpiration);
        return expiration.before(new Date());
    }

    /**
     * Extract the role from the JWT token.
     */
    public Role extractRoleFromToken(String token) {
        String role = extractClaim(token, claims -> claims.get("role", String.class));
        log.info("Extracted role from token: {}", role);
        return Role.valueOf(role); // Convert string to Role enum
    }
    
}
