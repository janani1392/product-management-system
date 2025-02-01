package com.janani.JwtAuthentication.exception;

//Create a specific exception for User Not Found
public class UserNotFoundException extends RuntimeException {
 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

public UserNotFoundException(String message) {
     super(message);
 }
}