package com.foodbox.restbackend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.foodbox.restbackend.model.Cuisine;

public interface CuisineRepository extends JpaRepository<Cuisine, Long> {
	void deleteCuisineById(Long id);

}//end interface
