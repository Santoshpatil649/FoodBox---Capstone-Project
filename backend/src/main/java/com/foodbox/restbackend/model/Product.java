package com.foodbox.restbackend.model;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Arrays;

import javax.persistence.*;

@Entity
@Table(name="products")
public class Product {
	
	//Properties
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="productId")
	private Long id;
	@Column(name="productImageUrl")
	private String productImageUrl;
	@Column(name="productName")
    private String productName;
	@Column(name="price")
    private BigDecimal price;
	@Column(name="calories")
    private int calories;
	@Column(name="rating")
    private float rating;
	@Column(name="numOfReviews")
    private float numOfReviews;
    @Lob
    @Column(name="description")
    private String description;
    @Column(name="tags")
    public String tags[];
    @Column(name="cuisines")
    public String cuisines[];
    @Column(name="dateCreated")
    private Timestamp dateCreated;
	
	//Default Constructor
    public Product() {}

    //Parameterized Constructors
	public Product(String productImageUrl, String productName, BigDecimal price, int calories, float rating,
			float numOfReviews, String description, String[] tags, String[] cuisines) {

		this.productImageUrl = productImageUrl;
		this.productName = productName;
		this.price = price;
		this.calories = calories;
		this.rating = rating;
		this.numOfReviews = numOfReviews;
		this.description = description;
		this.tags = tags;
		this.cuisines = cuisines;
	}
	
	//Getters & Setters
	public String getProductImageUrl() {
		return productImageUrl;
	}

	public void setProductImageUrl(String productImageUrl) {
		this.productImageUrl = productImageUrl;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public int getCalories() {
		return calories;
	}

	public void setCalories(int calories) {
		this.calories = calories;
	}

	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public float getNumOfReviews() {
		return numOfReviews;
	}

	public void setNumOfReviews(float numOfReviews) {
		this.numOfReviews = numOfReviews;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String[] getTags() {
		return tags;
	}

	public void setTags(String[] tags) {
		this.tags = tags;
	}

	public String[] getCuisines() {
		return cuisines;
	}

	public void setCuisines(String[] cuisines) {
		this.cuisines = cuisines;
	}

	public Timestamp getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Timestamp dateCreated) {
		this.dateCreated = dateCreated;
	}

	public Long getId() {
		return id;
	}
	
	//Other Methods
	@Override
	public String toString() {
		return "Product [id=" + id + ", productImageUrl=" + productImageUrl + ", productName=" + productName
				+ ", price=" + price + ", calories=" + calories + ", rating=" + rating + ", numOfReviews="
				+ numOfReviews + ", description=" + description + ", tags=" + Arrays.toString(tags) + ", cuisines="
				+ Arrays.toString(cuisines) + ", dateCreated=" + dateCreated + "]";
	}	
	
}//end class
