package com.janani.reactServiceApp.DTO;

import lombok.Data;

@Data
public class ProductDTO {
    private String name;
    private String category;
    private Double price;

    public ProductDTO(String name, String category, Double price) {
        this.name = name;
        this.category = category;
        this.price = price;
    }
}
