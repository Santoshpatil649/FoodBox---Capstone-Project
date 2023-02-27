import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuisine } from 'src/app/models/Cuisine';
import { environment } from 'src/environments/environment';

/* We mark our Product service as avaiable for dependency injection by decorating it with
   the @Injectable() annotation. */
@Injectable({
  providedIn: 'root'
})
export class CuisineService {
  //Properties
  private restUrl:string = environment.restUrl; //obtained from the development env settings

  //Constructor
  //whenever we generate a ProductService object, it will have the ability to perform HTTP requests due to dependency injection
  //Note: HttpClient will not send the raw data. It will send an Observable that you will have to subscribe to.
  constructor(private http:HttpClient) { }

  //HTTP Methods - should mirror the CuisineController on the backend

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
   * Method Name: getAllCuisines()
   * Access Type: public
   * Input Parameters: none
   * Return Type: Observable Cuisine[] array
   * Purpose: Calls the backend endpoint (HTTP GET)
   * ******************************************* */
  getAllCuisines(): Observable<Cuisine[]> {
    return this.http.get<Cuisine[]>(`${this.restUrl}/cuisines/all`);
  }

  /* *******************************************
   * Method Name: addCuisine()
   * Access Type: public
   * Input Parameters: Cuisine Object
   * Return Type: Observable of any Cuisine object
   * Purpose: Calls the backend /products/add endpoint (HTTP POST)
   * ******************************************* */
  public addCuisine(cuisine:Cuisine):Observable<Cuisine>{
    return this.http.post<Cuisine>(`${this.restUrl}/cuisines/add`, cuisine);
  }

  /* *******************************************
   * Method Name: updateCuisine()
   * Access Type: public
   * Input Parameters: Single Cuisine object
   * Return Type: Observable of Cuisine
   * Purpose: Calls the backend /products/product/update/id endpoint (HTTP PUT)
   * ******************************************* */
  public updateCuisine(cuisine: Cuisine, id:number): Observable<Cuisine> {
  return this.http.put<Cuisine>(`${this.restUrl}/cuisines/cuisine/update/${id}`, cuisine);
}

}//end class
