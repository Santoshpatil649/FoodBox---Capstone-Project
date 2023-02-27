package com.foodbox.restbackend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.foodbox.restbackend.model.UserRoles;


public interface UserRolesRepository extends JpaRepository<UserRoles, Long>{

}//end interface
