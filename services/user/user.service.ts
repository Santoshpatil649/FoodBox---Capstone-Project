import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

/* We mark our Product service as avaiable for dependency injection by decorating it with
   the @Injectable() annotation. */
@Injectable({
  providedIn: 'root'
})

//The Frontend UserService class should mirror the corresponding backend User controller class
export class UserService {

  //Properties
  private restUrl:string = environment.restUrl; //obtained from the development env settings

  //Constructor
  //whenever we generate a ProductService object, it will have the ability to perform HTTP requests due to dependency injection
  //Note: HttpClient will not send the raw data. It will send an Observable that you will have to subscribe to.
  constructor(private http:HttpClient) {
  }

  //HTTP Methods - should mirror the UserController on the backend
  /* *******************************************
   * Method Name: getAllUsers()
   * Access Type: public
   * Input Parameters: none
   * Return Type: Observable User[] array
   * Purpose: Calls the backend users/all endpoint (HTTP GET)
   * ******************************************* */
  public getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.restUrl}/users/all`);
  }

  /* *******************************************
   * Method Name: getUserById()
   * Access Type: public
   * Input Parameters: User ID number
   * Return Type: Observable User object
   * Purpose: Calls the backend users/user/id endpoint (HTTP GET)
   * ******************************************* */
  public getUserById(id:number):Observable<User>{
    return this.http.get<User>(`${this.restUrl}/users/user/` + id);
  }

  /* *******************************************
   * Method Name: addUser()
   * Access Type: public
   * Input Parameters: User Object
   * Return Type: Observable of any User object
   * Purpose: Calls the backend users/add endpoint (HTTP POST)
   * ******************************************* */
  public addUser(user:User):Observable<User>{
    return this.http.post<User>(`${this.restUrl}/users/add`, user);
  }

/* *******************************************
   * Method Name: updateUser()
   * Access Type: public
   * Input Parameters: Single User object
   * Return Type: Observable of User
   * Purpose: Calls the backend users/user/update/id endpoint (HTTP PUT)
   * ******************************************* */
public updateUser(user: User, id:number): Observable<User> {
  console.log("Inside the updateUser() method..");
  console.log(user);
  return this.http.put<User>(`${this.restUrl}/users/user/update/${id}`, user);
}

/* *******************************************
   * Method Name: deleteUserById()
   * Access Type: public
   * Input Parameters: User ID to be deleted
   * Return Type: void Observable
   * Purpose: Calls the backend endpoint (HTTP DELETE)
   * ******************************************* */
public deleteUserById(id: number): Observable<void> {
  return this.http.delete<void>(`${this.restUrl}/users/user/delete/${id}`);
}

}//end class
