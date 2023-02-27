import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cuisine } from 'src/app/models/Cuisine';
import { User } from 'src/app/models/User';
import { CuisineService } from 'src/app/services/cuisine/cuisine.service';
import { LoginService } from '../../services/login/login.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Properties
  loginForm:FormGroup; //form declared
  isSubmitted:boolean = false;

  public users:User[]=[];
  public cuisines:Cuisine[]=[];

  //Observables for database connections
  userObservable:Observable<User>;
  usersObservable:Observable<User[]>;
  cuisinesObservable:Observable<Cuisine[]>;

  //Constructor
  constructor(private builder:FormBuilder,
              private userService:UserService,
              private loginService:LoginService,
              private cuisineService:CuisineService,
              private router:Router) {
   //1. Assign the usersObservable
   this.usersObservable = this.userService.getAllUsers();

   //2. Subscribe to the usersObservable and assign the local users[]
    this.usersObservable.subscribe((serverUsers) => {
    this.users = serverUsers;
    console.log("All of the Users from the database..");
    console.log(this.users);
    })//end usersObservable.subscribe

    //3. Assign the cuisinesObservable
    this.cuisinesObservable = this.cuisineService.getAllCuisines();

    //4. Subscribe to the cuisinesObservable and assign the local cuisines[]
    this.cuisinesObservable.subscribe((serverCuisines) => {
      this.cuisines = serverCuisines;
      console.log("All of the Cuisines from the database..");
      console.log(this.cuisines);
    })//end cuisinesObservable.subscribe
  }//end constructor

  //Methods
  /* *******************************************
   * Method Name: ngOnInit()
   * Access Type: public
   * Input Parameters: none
   * Return Type: void
   * Purpose: Build the login form.
   *          ngOnInit() is invoked only once when the directive is instantiated.
   * ******************************************* */
  ngOnInit(): void {
    this.loginForm = this.builder.group(
      {
        userName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
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
      return this.loginForm.controls;
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
      if(this.loginForm.invalid)
        return; //don't allow the user to submit the form
      else{
        console.log("Inside onSubmit()...");
        console.log(this.loginForm.value); // prints form values in json format
        console.log("userName: " + this.loginForm.controls['userName'].value);
        console.log("password: " + this.loginForm.controls['password'].value);

        var uname = this.loginForm.controls['userName'].value;
        var pwd = this.loginForm.controls['password'].value;
        this.loginService.login(uname, pwd, this.users);
      }
    }

  }//end class
