package com.janani.reactServiceApp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.janani.reactServiceApp.DTO.ProductDTO;
import com.janani.reactServiceApp.exception.ProductNotFoundException;
import com.janani.reactServiceApp.model.Product;
import com.janani.reactServiceApp.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;


    public Page<ProductDTO> getProducts(int page, int size, String sortBy, String order, String keyword) {
        System.out.println("Sorting by: " + sortBy + ", Order: " + order);
        System.out.println("Keyword: " + keyword);

        // Validate that sortBy corresponds to valid Product fields
        if (!List.of("price", "name", "category").contains(sortBy)) {
            throw new IllegalArgumentException("Invalid sortBy parameter: " + sortBy);
        }

        // Configure sorting order dynamically
        Sort sort = order.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        System.out.println("Sort value: " + sort + ", Order: " + order);
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Product> productPage;

        // Check if keyword is provided
        if (keyword != null && !keyword.isEmpty()) {
            // Fetch products that match the keyword in name or category
            productPage = productRepository.findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(keyword, keyword, pageable);
        } else {
            // Fetch all products as per pagination and sorting
            productPage = productRepository.findAll(pageable);
        }

        // Convert Product entities to ProductDTOs
        List<ProductDTO> productDTOs = productPage.getContent().stream()
                .map(product -> new ProductDTO(product.getName(), product.getCategory(), product.getPrice()))
                .collect(Collectors.toList());
        System.out.println("productDTOs:" + productDTOs);

        return new PageImpl<>(productDTOs, pageable, productPage.getTotalElements());
    }

    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found"));
    }

    public Page<ProductDTO> getProductsByPriceGreaterThan(double price, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findByPriceGreaterThan(price, pageable);

        // Convert to ProductDTOs
        List<ProductDTO> productDTOs = productPage.getContent().stream()
                .map(product -> new ProductDTO(product.getName(), product.getCategory(), product.getPrice()))
                .collect(Collectors.toList());

        return new PageImpl<>(productDTOs, pageable, productPage.getTotalElements());
    }

    public Page<ProductDTO> getProductsByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findByCategory(category, pageable);

        // Convert to ProductDTOs
        List<ProductDTO> productDTOs = productPage.getContent().stream()
                .map(product -> new ProductDTO(product.getName(), product.getCategory(), product.getPrice()))
                .collect(Collectors.toList());

        return new PageImpl<>(productDTOs, pageable, productPage.getTotalElements());
    }

    public Page<ProductDTO> searchProducts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.searchByName(keyword, pageable);

        // Convert to ProductDTOs
        List<ProductDTO> productDTOs = productPage.getContent().stream()
                .map(product -> new ProductDTO(product.getName(), product.getCategory(), product.getPrice()))
                .collect(Collectors.toList());

        return new PageImpl<>(productDTOs, pageable, productPage.getTotalElements());
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    public long countInvalidProducts(double price) {
        // Create a query with criteria for invalid products (name empty OR price less than the specified price)
        Query query = new Query();
        query.addCriteria(
            Criteria.where("name").is("") // name is empty
                .orOperator(Criteria.where("price").lt(price)) // price is less than the specified value
        );

        // Count the number of documents that match the query
        return mongoTemplate.count(query, Product.class);
    }


    public void deleteInvalidProducts(double price) {
        Query query = new Query();
        query.addCriteria(
            Criteria.where("name").is("") // name is empty
                .orOperator(Criteria.where("price").lt(price)) // price is less than the specified value
        );

        mongoTemplate.remove(query, Product.class);
    }
}
