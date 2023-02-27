package com.foodbox.restbackend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodbox.restbackend.model.Product;
import com.foodbox.restbackend.model.Tag;
import com.foodbox.restbackend.service.ProductService;
import com.foodbox.restbackend.service.TagsService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path="/tags")
public class TagsController {
	
	//Properties
	private final TagsService tagsService;
	private final ProductService productService;
	
	//Constructor with Dependency Injection	
	public TagsController(TagsService tagsService, ProductService productService) {		
		this.tagsService = tagsService;
		this.productService = productService;
	}

	//REST Endpoints	
	@GetMapping(path="/all")
	public ResponseEntity<List<Tag>> getAllTags(){
		List<Tag> currentTags = tagsService.findAllTags();	
		List<Product> products = productService.findAllProducts();
		int tagCount=0, productCount=0;		
		
		for(Tag t : currentTags) {			
			System.out.println("Tag Id: " + t.getId() + ", Tag Name = " + t.getTagName());
			System.out.println("------------------------------------");
			
			if(t.getTagName().toLowerCase().equals("all")) {
				System.out.println("setting count of all products");
				productCount = productService.findAllProducts().size();				
				tagsService.updateTagProductCount(t, productCount);
			}
			else {						
				for(Product p : products) {				
					for(int i=0; i<p.getTags().length; i++) {					
						if(p.tags[i].equals(t.getTagName())) {
							System.out.println("\tProduct " + p.getId() + " - " + p.getProductName());
							tagCount++;
						}//end if
					}//product tags
				}//end products
				System.out.println("\tSetting Tag Id: " + t.getId() + "'s productCount to " + tagCount);			
				tagsService.updateTagProductCount(t, tagCount);
				System.out.println("\tresetting tagCount");
				tagCount=0;
			}//end else
		}//end Tag
		
		return new ResponseEntity<>(currentTags, HttpStatus.OK);
	}
	
	/* Method to update Tag stored in the database */
	@PutMapping("/tag/update/{id}")
	public ResponseEntity<Tag> updateTagProductCount(@RequestBody Tag tag, @PathVariable("id") Long id) {
		System.out.println("Tag Passed In:\n" + tag.toString());
		System.out.println("Id Passed In:" + id);
		Tag updatedTag = tagsService.updateTag(tag);
		return new ResponseEntity<>(updatedTag, HttpStatus.OK);
	}
		
	@PostMapping(path="/add")
    public ResponseEntity<Tag> addTags(@RequestBody Tag tag){
		Tag newTag = tag;
		tagsService.addTags(newTag);
		return new ResponseEntity<>(newTag, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/cuisine/delete/{id}")	
    public ResponseEntity<?> deleteTag(@PathVariable("id") Long id){
		tagsService.deleteTag(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	

}//end class
