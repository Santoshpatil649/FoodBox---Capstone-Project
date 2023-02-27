import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/models/Tag';
import { environment } from 'src/environments/environment';

/* We mark our Product service as avaiable for dependency injection by decorating it with
   the @Injectable() annotation. */
@Injectable({
  providedIn: 'root'
})
export class TagsBarService {

  //Properties
  private restUrl:string = environment.restUrl; //obtained from the development env settings

  //Constructor
  //whenever we generate a ProductService object, it will have the ability to perform HTTP requests due to dependency injection
  //Note: HttpClient will not send the raw data. It will send an Observable that you will have to subscribe to.
  constructor(private http:HttpClient) { }

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
   * Method Name: getAllTags()
   * Access Type: public
   * Input Parameters: none
   * Return Type: Observable Tag[] array
   * Purpose: Calls the backend endpoint (HTTP GET)
   * ******************************************* */
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.restUrl}/tags/all`);
  }

  /* *******************************************
   * Method Name: addTag()
   * Access Type: public
   * Input Parameters: Tag Object
   * Return Type: Observable of any Tag object
   * Purpose: Calls the backend /products/add endpoint (HTTP POST)
   * ******************************************* */
  public addTag(tag:Tag):Observable<Tag>{
    return this.http.post<Tag>(`${this.restUrl}/tags/add`, tag);
  }

/* *******************************************
   * Method Name: updateTag()
   * Access Type: public
   * Input Parameters: Single Tag object
   * Return Type: Observable of Tag
   * Purpose: Calls the backend /products/product/update/id endpoint (HTTP PUT)
   * ******************************************* */
public updateTag(tag: Tag, id:number): Observable<Tag> {
  return this.http.put<Tag>(`${this.restUrl}/tags/tag/update/${id}`, tag);
}

}//end class
