package com.janani.JwtAuthentication.keys;

import io.jsonwebtoken.security.Keys;
import java.util.Base64;

public class GenerateKey {
    public static void main(String[] args) {
        byte[] secretKeyBytes = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS512).getEncoded();
        String secretKey = Base64.getEncoder().encodeToString(secretKeyBytes);
        System.out.println("Generated Secret Key: " + secretKey);
    }
}
