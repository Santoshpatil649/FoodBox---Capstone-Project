import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Product from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  //Properties
  updateProductForm = new FormGroup(
    {
      productName: new FormControl(''),
      price: new FormControl(0),
      calories: new FormControl(0),
      rating: new FormControl(0),
      numOfReviews: new FormControl(0),
      description: new FormControl(''),
      productImageUrl:new FormControl('')
    }
  );
  submitted:boolean = false;
  message:boolean = false;
  tempProduct:Product = {
    id:0,
    productImageUrl: '',
    productName: '',
    price: 0,
    calories: 0,
    rating: 0,
    numOfReviews: 0,
    description: '',
    tags: [],
    cuisines: []
    }; //assigned the values from the form

  //Observables for database connections
  productObservable:Observable<Product>;

  //Constructor
  constructor(private productService:ProductService,
              private activatedRoute:ActivatedRoute) { }

  //Methods
  /* *******************************************
  * Method Name: ngOnInit()
  * Access Type: public
  * Input Parameters: none
  * Return Type: void
  * Purpose: Initialize the directive or component after Angular first displays the data-bound properties, builds form data,
  *          and sets the directive or component's input properties.
  *          ngOnInit() is invoked only once when the directive is instantiated.
  * ******************************************* */
  ngOnInit(): void {
    console.log(`Params id = ${this.activatedRoute.snapshot.params['id']}`);

    this.activatedRoute.params.subscribe((params) => {
      if(params['id']){
        this.productService.getProductById(params['id']).subscribe( (serverProduct) => {
          this.tempProduct = serverProduct;
          console.log(this.tempProduct);

          //initializing form with pre-filled values

          this.updateProductForm = new FormGroup(
            {
              productName: new FormControl(serverProduct['productName']),
              price: new FormControl(serverProduct['price']),
              calories: new FormControl(serverProduct['calories']),
              rating: new FormControl(serverProduct['rating']),
              numOfReviews: new FormControl(serverProduct['numOfReviews']),
              description: new FormControl(serverProduct['description']),
              productImageUrl:new FormControl(serverProduct['productImageUrl'])
            });//end FormGroup

        });//end productService.subscribe()
      }//end if
    });//end activatedRoute.subscribe

  }

  /* *******************************************
    * Method Name: form()
    * Access Type: public
    * Input Parameters: none
    * Return Type: none
    * Purpose: Getter method to get all of the form controls
    * ******************************************* */
  get form(){
    return this.updateProductForm.controls;
  }

  removeMessage(){
    this.message = false;
  }

  /* *******************************************
    * Method Name: onSubmit()
    * Access Type: public
    * Input Parameters: none
    * Return Type: none
    * Purpose: Getter method to get all of the form controls
    * ******************************************* */
  onSubmit(){
    console.log("form values:")
    console.log(this.updateProductForm.value);
    console.log("this.updatedProduct = ");
    console.log(this.tempProduct);

    this.productObservable = this.productService.updateProduct(this.tempProduct, this.activatedRoute.snapshot.params['id']);
    this.productObservable.subscribe( (serverUpdatedProduct) =>
    {
      console.log(serverUpdatedProduct);
      console.log("Update Product in the database");
    }); //end updateProduct.subscribe()
    this.message = true;
    this.submitted = true;
  }


}//end class
