package com.foodbox.restbackend.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.foodbox.restbackend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

	Optional<Product> findProductById(Long id);
	
	void deleteProductById(Long id); //SpringBoot is intelligent enough to figure out
	
	@Query("SELECT p FROM Product p WHERE p.productName LIKE %?1%")
	public List<Product> findAllProductsBySearchTerm(String searchTerm);	
	
	@Query("SELECT p FROM Product p WHERE p.tags LIKE %?1%")
	public List<Product> findAllProductsByTag(String tag);

	@Query("SELECT p FROM Product p WHERE p.cuisines LIKE %?1%")
	List<Product> findAllProductsByCuisine(String cuisine);

}//end interface
