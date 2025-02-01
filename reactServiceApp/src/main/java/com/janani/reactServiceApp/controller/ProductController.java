package com.janani.reactServiceApp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.janani.reactServiceApp.DTO.ProductDTO;
import com.janani.reactServiceApp.model.Product;
import com.janani.reactServiceApp.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public Page<ProductDTO> getProducts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "price,asc") String sort,
        @RequestParam(defaultValue = "") String keyword
    ) {
    	System.out.println("Fetching all products...");
        // Parse sort parameter
        String[] sortParts = sort.split(",");
        String sortBy = sortParts[0];
        String order = (sortParts.length > 1) ? sortParts[1] : "asc";

        System.out.println("sort and order value in controller:" + sortBy + "\t" + order);
        System.out.println("Keyword: " + keyword);

        return productService.getProducts(page, size, sortBy, order, keyword);
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllProducts() {
        return ResponseEntity.ok("This is a secured endpoint. You accessed it with a valid JWT token!");
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    @GetMapping("/expensive")
    public Page<ProductDTO> getExpensiveProducts(
        @RequestParam double price,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return productService.getProductsByPriceGreaterThan(price, page, size);
    }

    @GetMapping("/category")
    public Page<ProductDTO> getProductsByCategory(
        @RequestParam String category,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return productService.getProductsByCategory(category, page, size);
    }

    @GetMapping("/search")
    public Page<ProductDTO> searchProducts(
        @RequestParam String keyword,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return productService.searchProducts(keyword, page, size);
    }

    @PostMapping
    public ResponseEntity<Object> addProduct(@Valid @RequestBody Product product, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMessages = new HashMap<>();
            result.getFieldErrors().forEach(error ->
                errorMessages.put(error.getField(), error.getDefaultMessage())
            );
            return new ResponseEntity<>(errorMessages, HttpStatus.BAD_REQUEST);
        }

        Product savedProduct = productService.addProduct(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @DeleteMapping("/cleanup")
    public ResponseEntity<String> cleanupInvalidProducts() {
    	double price = 0.0; // specify your price threshold here
        long invalidCount = productService.countInvalidProducts(price);

        System.out.println("Invalid values:"+invalidCount);

        if (invalidCount == 0) {
            return ResponseEntity.ok("No invalid products found.");
        }

        productService.deleteInvalidProducts(price);
        return ResponseEntity.ok("Deleted " + invalidCount + " invalid product(s).");
    }
}
