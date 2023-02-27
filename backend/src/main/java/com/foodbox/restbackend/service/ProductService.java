package com.foodbox.restbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbox.restbackend.exception.ProductNotFoundException;
import com.foodbox.restbackend.model.Product;
import com.foodbox.restbackend.repo.ProductRepository;

@Service
@Transactional
public class ProductService {
	
	//Properties
	private final ProductRepository productRepo;	

	//Constructor with Dependency Injection of the Product Repository	
	@Autowired
	public ProductService(ProductRepository productRepo) {
		this.productRepo = productRepo;
	}
	
	//CRUD Methods
	public Product addProduct(Product product) {        
        return productRepo.save(product);
    }
	
	public Product getProduct(Long id) {		
		return productRepo.findById(id).get();
	}
	
	public List<Product> findAllProducts(){
		return productRepo.findAll();
	}
	
	public Product updateProduct(Product product) {		
			return productRepo.save(product);		
	}
	
	public Product updateProduct(Product product, Long id) {
		if(product.getId() == id)
			return productRepo.save(product);
		return product;
	}
	
	public Product findProductById(Long id) {
		return productRepo.findProductById(id)
				.orElseThrow(() -> new ProductNotFoundException("Product by id" + id + " was not found"));
	}
	
	//must have @Transactional annotation for this to work properly
	public void deleteProduct(Long id) {
		productRepo.deleteProductById(id);
	}

	public List<Product> findAllProductsBySearchTerm(String searchTerm) {
		if(searchTerm != null) {
			return productRepo.findAllProductsBySearchTerm(searchTerm);
		}
		return productRepo.findAll();
	}	

	public List<Product> findAllProductsByTag(String tag) {		
		System.out.println("Inside ProductService findAllProductsByTag() method...");
		if(tag != null) {
			return productRepo.findAllProductsByTag(tag);
		}
		else
			return productRepo.findAll();
	}
	
	public List<Product> findAllProductsByCuisine(String cuisine){
		if(cuisine != null)
			return productRepo.findAllProductsByCuisine(cuisine);
		else
			return productRepo.findAll();
	}

	public List<Product> updateAllProducts(List<Product> updatedProductList) {
		// TODO Add repoService to update all products
		return null;
	}

}//end class
