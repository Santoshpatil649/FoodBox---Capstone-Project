package com.foodbox.restbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="cuisines")
public class Cuisine {
	
	//Properties
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="cuisineid")
	private Long id;
	@Column(name="cuisineName")
	private String cuisineName;
	@Column(name="productcount", columnDefinition = "int default 0")		
	private int productCount = 0;
	
	//Default Constructor
	public Cuisine() {}
	
	//Parameterized Constructors
	public Cuisine(String cuisineName) {	
		this.cuisineName = cuisineName;
	}
	
	//Getters & Setters
	public String getCuisineName() {
		return cuisineName;
	}	

	public void setCuisineName(String cuisineName) {
		this.cuisineName = cuisineName;
	}	

	public int getProductCount() {
		return productCount;
	}

	public void setProductCount(int productCount) {
		this.productCount = productCount;
	}

	public Long getId() {
		return id;
	}

	//Other Methods
	@Override
	public String toString() {
		return "Cuisine [id=" + id + ", cuisineName=" + cuisineName + ", productCount=" + productCount + "]";
	}

}//end class
