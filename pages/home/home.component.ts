import { Component, OnInit, Input } from '@angular/core';
import Product from '../../models/Product';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  //Properties
  public products: Product[] = [];

 //Constructor will injecting a dependency on the productService object
 constructor(private productService:ProductService,
             activatedRoute:ActivatedRoute) {

  let productsObservable:Observable<Product[]>;

  //Let's listen to the route parameters using the activated route instance
  activatedRoute.params.subscribe( (params) => {

      //Step 1. Assign the productsObservable; all 3 methods will return an Observable Product[]
      if(params['searchTerm']){
        console.log("Params has a search term: " + params['searchTerm']);
        console.log("Calling getAllProductsBySearchTerm()");
        productsObservable = this.productService.getAllProductsBySearchTerm(params['searchTerm']);
      }
      else if (params['desiredTag']){
        console.log("Params has a tag: " + params['desiredTag']);
        console.log("Calling getAllProductsByTag()");
        productsObservable = this.productService.getAllProductsByTag(params['desiredTag']);
      }
      else if (params['desiredCuisine']){
        console.log("Params has a desiredCuisine: " + params['desiredCuisine']);
        console.log("Calling getAllProductsByCuisine()");
        productsObservable = this.productService.getAllProductsByCuisine(params['desiredCuisine']);
      }
      else {
        console.log("No Params....Calling getAllProducts()");
        productsObservable = this.productService.getAllProducts();
      }

      //Step 2. Subscribe to the productsObservable
      productsObservable.subscribe( (serverProducts) => {
              this.products = serverProducts;
              console.log("Assigning products found...");
              console.log(this.products);
      })//end productsObservable.subscribe
    })//end activatedRoute.params.subscribe
  }//end constructor

  ngOnInit(): void {
  }

}//end class
