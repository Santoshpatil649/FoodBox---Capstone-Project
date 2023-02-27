import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Product from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product/product.service';


@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  //Properties
  public products:Product[]=[];

  //Observables for database connections
  productObservable:Observable<Product>;
  productsObservable:Observable<Product[]>;

  //Constructor
  constructor(private activatedRoute:ActivatedRoute,
              private productService:ProductService) {

    //1. Assign the productsObservable
    this.productsObservable = this.productService.getAllProducts();

    //2. Subscribe to the productsObservable and assign the local products[]
    this.productsObservable.subscribe((serverProducts) => {
    this.products = serverProducts;
    console.log("All of the Users from the database..");
    console.log(this.products);
    });//end productsObservable.subscribe
  }

  //Methods
  ngOnInit(): void {
  }

}//end class
