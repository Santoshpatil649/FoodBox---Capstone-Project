package com.foodbox.restbackend.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbox.restbackend.model.Tag;


public interface TagsRepository extends JpaRepository<Tag, Long>{
	void deleteTagById(Long id);
	
//	@Modifying
//	@Transactional
//	@Query("UPDATE tags SET productcount = :newProductCount WHERE tag_id = :id")
//	public void updateProductCountById(@Param("id") Long id, @Param("newProductCount") int newProductCount);

}//end interface
