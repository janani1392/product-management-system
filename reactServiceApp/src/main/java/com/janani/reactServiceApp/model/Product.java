package com.janani.reactServiceApp.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Document(collection = "products")
public class Product {

    @Id
    private String id; // MongoDB's unique identifier
    @Indexed
    @NotBlank(message = "Name is mandatory")
    private String name;
    private String description;
    @Indexed
    @Min(value = 0, message = "Price must be greater than or equal to 0")
    private Double price;
    private Integer quantity;
    @Indexed
    private String category;
}