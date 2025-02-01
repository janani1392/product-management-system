package com.janani.JwtAuthentication.exception;

//Create a specific exception for Invalid Credentials
public class InvalidCredentialsException extends RuntimeException {
 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

public InvalidCredentialsException(String message) {
     super(message);
 }
}