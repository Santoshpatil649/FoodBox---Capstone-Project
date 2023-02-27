package com.foodbox.restbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbox.restbackend.exception.UserNotFoundException;
import com.foodbox.restbackend.model.User;
import com.foodbox.restbackend.repo.UserRepository;

@Service
@Transactional
public class UserService {
	
	//Properties
	private final UserRepository userRepo;
	
	//Constructor with Dependency Injection of the User Repository	
	@Autowired
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }
	
	//CRUD Methods		
	public User addUser(User user) {        
        return userRepo.save(user);
    }
	
	public List<User> findAllUsers(){
		return userRepo.findAll();
	}
	
	public User updateUser(User user) {
		return userRepo.save(user);
	}
	
	public User updateUser(User user, Long id) {
		if(user.getId() == id)
			return userRepo.save(user);
		return user;
	}		
	
	public User findUserById(Long id) {
		return userRepo.findUserById(id)
				.orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
	}
	
	//must have @Transactional annotation for this to work properly
	public void deleteUser(Long id) {
		userRepo.deleteUserById(id);
	}

}//end class
