import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { ProductService } from 'src/app/services/product/product.service';
import Product from '../../models/Product';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css']
})
export class RemoveProductComponent implements OnInit {

  //Properties
  removeProductForm:FormGroup; //form declared
  isSubmitted:boolean = false;
  removeBtnState:boolean = false;

  products:Product[]; //all products
  productsObservable:Observable<Product[]>;

  //Constructor
  constructor(private builder:FormBuilder,
              private productService:ProductService,
              private http:HttpClient,
              private router:Router) {
    this.productsObservable = productService.getAllProducts();
    this.productsObservable.subscribe( (serverProducts) => {
      this.products = serverProducts;
    })//end productObversable.subscribe
  }//end constructor

  //Methods
  ngOnInit(): void {
   this.removeProductForm = this.builder.group(
    {
    }
   )
  }

  /* *******************************************
    * Method Name: getFormControls()
    * Access Type: public
    * Input Parameters: none
    * Return Type: none
    * Purpose: Getter method to get all of the form controls
    * ******************************************* */
  get getFormControls(){
    return this.removeProductForm.controls;
  }

  /* *******************************************
    * Method Name: onSubmit()
    * Access Type: public
    * Input Parameters: none
    * Return Type: void
    * Purpose:
    * ******************************************* */
  onSubmit(){
    this.isSubmitted = true;
  }

  /* *******************************************
    * Method Name: deleteProduct()
    * Access Type: public
    * Input Parameters: Product object to be deleted
    * Return Type: void
    * Purpose: Call the product service to connect to the backend HTTP DELETE method
    * ******************************************* */
  deleteProduct(product:Product):void{

    console.log("Inside deleteProduct()...");
    console.log("Product to be deleted: ");
    console.log(product);
    console.log("Product id = " + product.id);
    console.log("Getting ready to call the HTTP delete method from the productService...");

    /* The component isn't expecting a result from the delete operation, so it subscribes without a callback.
    Even though you are not using the result, you still have to subscribe.
    Calling the subscribe() method executes the observable, which is what initiates the DELETE request.*/
    this.productService.deleteProductById(product.id).subscribe();

    alert("Removed Product from the Food Box inventory...");

    //Form Product Refresh
    this.productsObservable = this.productService.getAllProducts();
    this.productsObservable.subscribe( (serverProducts) => {
      this.products = serverProducts;
    })//end productObservable.subscribe
  }

}//end class
