package com.foodbox.restbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="userRoles")
public class UserRoles {
	//Properties
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name="roleid")
		private Long id;
		@Column(name="roleType")
		private String roleType;
		
		//Default Constructor
		public UserRoles() {}

		//Parameterized Constructors
		public UserRoles(String roleType) {			
			this.roleType = roleType;
		}

		//Getters & Setters
		public String getRoleType() {
			return roleType;
		}

		public void setRoleType(String roleType) {
			this.roleType = roleType;
		}

		public Long getId() {
			return id;
		}

		//Other Methods
		@Override
		public String toString() {
			return "UserRoles [id=" + id + ", roleType=" + roleType + "]";
		}
		
}//end class
