package com.foodbox.restbackend.model;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User implements Serializable{
	
	//Properties
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="userid")    
	private Long id;
	@Column(name="roleType")
	private String roleType;
	@Column(name="firstname")
	private String firstName;
	@Column(name="lastname")
	private String lastName;
	@Column(name="username")
	private String userName;
	@Column(name="email")
	private String email;
	@Column(name="password")
	private String password;
	@Column(name="phoneNumber")
	private String phoneNumber;
	@Column(name="dateCreated")
	private Timestamp dateCreated;
	@Column(name="address")
	private String address;
	
	//Default Constructor
	public User() {}
	
	//Parameterized Constructors
	public User(String firstName, String lastName, String userName, String email, String password,
			String phoneNumber) {		
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
	}
		
	public User(String roleType, String firstName, String lastName, String userName, String email, String password,
			String phoneNumber, String address) {
		this.roleType = roleType;
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.address = address;
	}

	//Getters & Setters
	public Long getId() {
		return id;
	}
	
	public String getRoleType() {
		return roleType;
	}

	public void setRoleType(String roleType) {
		this.roleType = roleType;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Timestamp getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Timestamp dateCreated) {
		this.dateCreated = dateCreated;
	}
	public String getAddress(String address) {
		return address;
	}
	public void setAddress(String address) {
		this.address =address;
	}

	//Other Methods
	@Override
	public String toString() {
		return "User [id=" + id + ", roleType=" + roleType + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", userName=" + userName + ", email=" + email + ", password=" + password + ", phoneNumber="
				+ phoneNumber + ", address="+ address + ", dateCreated=" + dateCreated + "]";
	}

}//end class
