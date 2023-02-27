package com.foodbox.restbackend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.foodbox.restbackend.model.User;


public interface UserRepository extends JpaRepository<User, Long>  {
	void deleteUserById(Long id);
	
	Optional<User> findUserById(Long id);
	
}//end interface
