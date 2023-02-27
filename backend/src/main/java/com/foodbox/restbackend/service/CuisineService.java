package com.foodbox.restbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbox.restbackend.model.Cuisine;
import com.foodbox.restbackend.repo.CuisineRepository;

@Service
@Transactional
public class CuisineService {
	
	//Properties
	private final CuisineRepository cuisineRepo;
	
	//Constructor with Dependency Injection of the Tags Repository	
	@Autowired
	public CuisineService(CuisineRepository cuisineRepo) {		
		this.cuisineRepo = cuisineRepo;
	}
	
	//CRUD Methods
	public List<Cuisine> findAllCuisines() {		
		return cuisineRepo.findAll();
	}
	
	public Cuisine addCuisine(Cuisine cuisine) {
		return cuisineRepo.save(cuisine);
	}

	public void updateCuisineProductCount(Cuisine cuisine, int newProductCount) {
		cuisine.setProductCount(newProductCount);		
	}

	public Cuisine updateCuisine(Cuisine cuisine) {
		return cuisineRepo.save(cuisine);
	}
	
	public Cuisine updateCuisine(Cuisine cuisine, Long id) {
		if(cuisine.getId() == id)
			return cuisineRepo.save(cuisine);
		return null;
	}

	//must have @Transactional annotation for this to work properly
	public void deleteTag(Long id) {		
		cuisineRepo.deleteCuisineById(id);	
	}

}//end class
