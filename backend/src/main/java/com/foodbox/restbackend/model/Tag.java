package com.foodbox.restbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tags")
public class Tag {
	
	//Properties
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="tagid")
	private Long id;
	@Column(name="tagname")
	private String tagName;
	@Column(name="productcount", columnDefinition = "int default 0")		
	private int productCount = 0;
	
	//Default Constructor
	public Tag() {}
	
	//Parameterized Constructors	
	public Tag(String tagName, int productCount) {		
		this.tagName = tagName;
		this.productCount = productCount;
	}
	
	public Tag(String tagName) {		
		this.tagName = tagName;		
	}

	//Getters & Setters	
	public Long getId() {
		return id;
	}
	
	public String getTagName() {
		return tagName;
	}
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}		

	public int getProductCount() {
		return productCount;
	}

	public void setProductCount(int productCount) {
		this.productCount = productCount;
	}
	
	//Other Methods
	@Override
	public String toString() {
		return "Tag [id=" + id + ", tagName=" + tagName + ", productCount=" + productCount + "]";
	}

}//end class
