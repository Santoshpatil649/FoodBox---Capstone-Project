import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Product from 'src/app/models/Product';
import { Tag } from 'src/app/models/Tag';
import { environment } from 'src/environments/environment';

/* We mark our Product service as avaiable for dependency injection by decorating it with
   the @Injectable() annotation. */
@Injectable({
  providedIn: 'root'
})

//The Frontend ProductService class should mirror the corresponding backend Product controller class
export class ProductService {

  //Properties
  private restUrl:string = environment.restUrl; //obtained from the development env settings

  //Constructor
  //whenever we generate a ProductService object, it will have the ability to perform HTTP requests due to dependency injection
  //Note: HttpClient will not send the raw data. It will send an Observable that you will have to subscribe to.
  constructor(private http:HttpClient) {
  }


  //HTTP Methods - should mirror the ProductController on the backend

  /* Notes: For Angular to connect to backend servers, we need Observables (from Reactive Extension library)
   * An Observable represents an asynchronous data stream where data arrives asynchronously.
   * Observables provide support for passing messages between part of your application
   * The observer pattern is a software design pattern in which an object (subject),
   * maintains a list of its dependents (observers/subscribers/watchers), and notifies them automatically of state changes.
   * Observables are declarative — that is, you define a function for publishing values, but
   * it is not executed until a consumer subscribes to it.
   * The subscribed consumer then receives notifications until the function completes, or until they unsubscribe.
   * Source: https://angular.io/guide/observables
   */

   /* *******************************************
   * Method Name: getAllProducts()
   * Access Type: public
   * Input Parameters: none
   * Return Type: Observable Product[] array
   * Purpose: Calls the backend /products/all endpoint (HTTP GET)
   * ******************************************* */
   public getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.restUrl}/products/all`);
  }

  /* *******************************************
   * Method Name: getProductById()
   * Access Type: public
   * Input Parameters: Product ID number
   * Return Type: Observable Product object
   * Purpose: Calls the backend /products/product/id endpoint (HTTP GET)
   * ******************************************* */
  public getProductById(id:number):Observable<Product>{
      return this.http.get<Product>(`${this.restUrl}/products/product/` + id);
  }

  /* *******************************************
   * Method Name: addProduct()
   * Access Type: public
   * Input Parameters: Product Object
   * Return Type: Observable of any Product object
   * Purpose: Calls the backend /products/add endpoint (HTTP POST)
   * ******************************************* */
  public addProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(`${this.restUrl}/products/add`, product);
  }

  /* *******************************************
   * Method Name: updateProduct()
   * Access Type: public
   * Input Parameters: Single Product object
   * Return Type: Observable of Product
   * Purpose: Calls the backend /products/product/update/id endpoint (HTTP PUT)
   * ******************************************* */
  public updateProduct(product: Product, id:number): Observable<Product> {
    return this.http.put<Product>(`${this.restUrl}/products/product/update/${id}`, product);
  }

  /* *******************************************
   * Method Name: deleteProductById()
   * Access Type: public
   * Input Parameters: Product ID to be deleted
   * Return Type: void Observable
   * Purpose: Calls the backend /products/product/delete/id endpoint (HTTP DELETE)
   * ******************************************* */
  public deleteProductById(id: number):Observable<Product> {
    console.log("Made it to the delete method...");
    return this.http.delete<Product>(`${this.restUrl}/products/product/delete/${id}`);
  }

  /* *******************************************
   * Method Name: getAllProductsBySearchTerm()
   * Access Type: public
   * Input Parameters: search term string
   * Return Type: Observable Product[] array
   * Purpose: Calls the backend endpoint (HTTP GET)
   * ******************************************* */
  getAllProductsBySearchTerm(searchTerm:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.restUrl}/products/search/${searchTerm}`);
  }

  /* *******************************************
   * Method Name: getAllProductsByTag()
   * Access Type: public
   * Input Parameters: search term string
   * Return Type: Observable Product[] array
   * Purpose: Calls the backend endpoint (HTTP GET)
   * ******************************************* */
  getAllProductsByTag(tag: string): Observable<Product[]> {
    return tag.toLowerCase() === "all" ?
      this.getAllProducts() :
      this.http.get<Product[]>(`${this.restUrl}/products/tag/${tag}`);
  }

  /* *******************************************
   * Method Name: getAllProductsByCuisine()
   * Access Type: public
   * Input Parameters: cuisine string
   * Return Type: Observable Product[] array
   * Purpose: Calls the backend endpoint (HTTP GET)
   * ******************************************* */
  getAllProductsByCuisine(desiredCuisine:string):Observable<Product[]>{
    return desiredCuisine.toLowerCase() === "all" ?
    this.getAllProducts() :
    this.http.get<Product[]>(`${this.restUrl}/products/cuisine/${desiredCuisine}`);
  }

}//end class
