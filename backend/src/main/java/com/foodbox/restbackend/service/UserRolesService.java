package com.foodbox.restbackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbox.restbackend.model.UserRoles;
import com.foodbox.restbackend.repo.UserRolesRepository;

@Service
@Transactional
public class UserRolesService {
	
	//Properties
	private final UserRolesRepository userRolesRepo;

	public UserRolesService(UserRolesRepository userRolesRepo) {		
		this.userRolesRepo = userRolesRepo;
	}

	public List<UserRoles> findAllUserRoles() {		
		return userRolesRepo.findAll();
	}	

}//end class
