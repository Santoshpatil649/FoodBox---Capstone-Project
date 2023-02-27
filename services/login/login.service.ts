import { Injectable, Input } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { User } from 'src/app/models/User';
import { CartService } from '../cart/cart.service';

/* We mark our Login service class as available for dependency injection by decorating it with
   the @Injectable() annotation. */
@Injectable({
  providedIn: 'root'
})

/* Note: Whenever we create a new service class and want to use it, we should specify it in the providers
array of our module class to state that we want to use this service in that module (i.e. AppModule). */
export class LoginService {

  //Properties
  private _isLoggedIn:boolean = false;
  private _isAdmin:boolean = false;
  private _loggedInUser:User = new User();
  private _isAuthenticated:boolean = false;

  //Constructor
  constructor(private router:Router, private cartService:CartService) { }

  // Getter & Setter Methods
  @Input()
  public get isLoggedIn():boolean{
    return this._isLoggedIn;
  }

  public set isLoggedIn(state:boolean){
    this._isLoggedIn = state;
  }

  @Input()
  public get isAdmin():boolean{
    return this._isAdmin;
  }

  public set isAdmin(state:boolean){
    this._isAdmin = state;
  }

  @Input()
  public get loggedInUser():User{
    return this._loggedInUser;
  }

  public set loggedInUser(user:User){
    this._loggedInUser = user;
  }

  @Input()
  public get isAuthenticated():boolean{
    return this._isAuthenticated;
  }

  public set isAuthenticated(state:boolean){
    this._isAuthenticated = state;
  }

  //Other Methods

  /* *******************************************
   * Method Name: login()
   * Access Type: public
   * Input Parameters: none
   * Return Type: boolean
   * Purpose:
   *
   * ******************************************* */
  login(uname:string, pwd:string, users:User[]){

    //check Form username against the users in the database
    for(let i=0; i<users.length;i++){
      if(uname.toLowerCase() === users[i].userName.toLowerCase()){
        console.log("found username...")

        //check the Form password against the users in the database
        if(pwd.toLowerCase() === users[i].password.toLowerCase()){
          console.log("found matching password...");
          this._isLoggedIn = true;
          this._loggedInUser = users[i];
          this._isAuthenticated = true;

          //check to see if the User has a Admin role
          if(users[i].roleType.toLowerCase() == "admin"){
            this._isAdmin = true;
          }
          //alert("User successfully logged in...");
          console.log("User successfully logged in...");
          this.router.navigate(['/home']);
          return true;
        }//end password match
      }//end username match
    }//end for loop database users

    return false;
  }

  registerUser(user:User):void{
    this._isLoggedIn = true;
    this._isAuthenticated = true;
    this._loggedInUser = user;
    if(this._loggedInUser.roleType.toLowerCase() == "admin"){
      this._isAdmin = true;
    }

  }

  /* *******************************************
   * Method Name: logout()
   * Access Type: public
   * Input Parameters: none
   * Return Type: boolean
   * Purpose: To reset the state of the isLoggedIn property back to false
   *          We don’t call a remote service because the server is not aware if a user is logged in or not.
   * ******************************************* */
  logout():void{
    console.log("Logging out " + this._loggedInUser.firstName);
    //resetting the authentication properties
    this._isLoggedIn=false;
    this._isAuthenticated=false;
    this._isAdmin=false;
    this._loggedInUser = new User();

    //clearing the cart (if necessary)
    this.cartService.clearCart();

    //navigating to the FoodBox login page
    this.router.navigate(['/login']);
  }
}//end class
