import { Injectable } from '@angular/core';
import Product from 'src/app/models/Product';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  /* --------- Properties -------------------- */


  /* --------- Constructor ------------------- */
  constructor(private productService:ProductService) { }

  /* --------------- Methods ----------------- */
  /* *******************************************
   * Method Name:
   * Access Type: public
   * Input Parameters:
   * Return Type:
   * Purpose:
   * ***************************************** */
  addProduct(product:Product){

    this.productService.addProduct(product);

  }

  removeProduct(product:Product){
    this.productService.deleteProductById(product.id);
  }
}
