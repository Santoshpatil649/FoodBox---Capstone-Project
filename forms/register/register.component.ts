import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cuisine } from 'src/app/models/Cuisine';
import { User } from 'src/app/models/User';
import { CuisineService } from 'src/app/services/cuisine/cuisine.service';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //Properties
  registerForm:FormGroup; //form declared
  submitted:boolean = false;
  message:boolean = false;

  public users:User[]=[];
  public cuisines:Cuisine[]=[];
  tempUser:User = new User(); //assigned the values from the registration form

  //Observables for database connections
  userObservable:Observable<User>;
  usersObservable:Observable<User[]>;
  cuisinesObservable:Observable<Cuisine[]>;

  //business logic variables
  userAlreadyExists:boolean = false;

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
  ngOnInit(): void {
    this.registerForm = this.builder.group(
      {
        firstName: ['', Validators.required],
        lastName:['', Validators.required],
        userName:['', Validators.required],
        email:['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phoneNumber: ['', Validators.pattern('[0-9]{10}')],
        address: ['', Validators.required],
        roleType: ['customer', Validators.required]
      }
    )

  }//end ngOnInit()

  /* *******************************************
    * Method Name: getFormControls()
    * Access Type: public
    * Input Parameters: none
    * Return Type: none
    * Purpose: Getter method to get all of the form controls
    * ******************************************* */
  get form(){
    return this.registerForm.controls;
  }

  /* *******************************************
    * Method Name: onSubmit()
    * Access Type: public
    * Input Parameters: none
    * Return Type: none
    * Purpose: Getter method to get all of the form controls
    * ******************************************* */
  onSubmit(){
    this.submitted = true;

    if(this.registerForm.invalid){
      console.log("form is invalid...");
      return; //don't allow the user to submit the form
    }
    else{
      console.log("Form Data:");
      console.log(this.tempUser); //the User set from the form values
      console.log("Users from the database");
      console.log(this.users);

      //check userName on the form against usernames from the database
      for(let i=0; i<this.users.length;i++){
        if(this.tempUser.userName.toLowerCase() === this.users[i].userName.toLowerCase()){
           this.userAlreadyExists=true;
           console.log("username already exists...")
           alert("Username already exists...Please try again!");
           this.router.navigate(['/register']);
        }
      }
      //if no match, add the newUser to the database
      if(!this.userAlreadyExists){
        this.userObservable = this.userService.addUser(this.tempUser);
        this.userObservable.subscribe((serverUser) => {
          this.loginService.registerUser(serverUser);
          this.message = true;
          console.log("Added User to the database..");
        });//end usersObservable.subscribe
        this.router.navigate(['/home']);
      }
    }
  }

  removeMessage(){
    this.message = false;
    this.resetForm();
  }

  resetForm(){
    for(let control in this.registerForm.controls){
      this.registerForm.controls[control].setValue('');
      this.registerForm.controls[control].setErrors(null);
    }
  }

}//end class
