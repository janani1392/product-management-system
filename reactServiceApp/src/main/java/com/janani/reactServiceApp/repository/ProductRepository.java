package com.janani.reactServiceApp.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import com.janani.reactServiceApp.model.Product;

public interface ProductRepository extends MongoRepository<Product, String> {

	// Search by keyword in name or category
    Page<Product> findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(String nameKeyword, String categoryKeyword, Pageable pageable);


	 @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
	           "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
	    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

	// Custom query methods can be added here if needed
	@Query(value = "{'price': {$gt: ?0}}", fields = "{'name': 1, 'price': 1, 'category': 1}")
	List<Product> findByPriceGreaterThan(double price);

	// To find products by category
	@Query(value = "{'category': ?0}", fields = "{'name': 1, 'price': 1, 'category': 1}")
	Page<Product> findByCategory(String category, Pageable pageable);

	// Retrieve products with a price greater than the given value, sorted by price
	// in ascending order.
	List<Product> findByPriceGreaterThanOrderByPriceAsc(double price);

	// Support pagination for finding products with a price greater than a given
	// value
	Page<Product> findByPriceGreaterThan(double price, Pageable pageable);

	// Support pagination for sorting products by price in ascending order
	Page<Product> findByPriceGreaterThanOrderByPriceAsc(double price, Pageable pageable);

	// Search by partial product name or description
	@Query(value = "{'name': {$regex: ?0, $options: 'i'}}")
	Page<Product> searchByName(String name, Pageable pageable);

	 // Method to delete products with an empty name or negative price
	@Query(value = "{ $or: [ { 'name': '' }, { 'price': { $lt: 0 } } ] }", delete = true)
	void deleteByNameIsEmptyOrPriceLessThan();

	long countByNameIsEmptyOrPriceLessThan(double price);
    void deleteByNameIsEmptyOrPriceLessThan(double price);

}
