package com.foodbox.restbackend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodbox.restbackend.model.UserRoles;
import com.foodbox.restbackend.service.UserRolesService;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path="/userRoles")
public class UserRolesController {
	
	//Properties
	private final UserRolesService userRolesService;

	//Constructor with Dependency Injection	
	public UserRolesController(UserRolesService userRolesService) {		
		this.userRolesService = userRolesService;
	} 
	
	//REST Endpoints	
	@GetMapping(path="/all")
	public ResponseEntity<List<UserRoles>> getAllUserRoles(){
		List<UserRoles> roles = userRolesService.findAllUserRoles();		
		return new ResponseEntity<>(roles, HttpStatus.OK);
	}
	

}//end class
