import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  //Properties
  updateUser = new FormGroup(
    {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      userName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      roleType: new FormControl('customer')
    });
  submitted:boolean = false;
  message:boolean = false;
  user:User = new User();
  //tempUser:User = new User(); //assigned the values from the form

  //Observables for database connections
  userObservable:Observable<User>

  //Constructor
  constructor(private http:HttpClient,
              private userService:UserService,
              private activatedRoute:ActivatedRoute) {

     }

  //Methods
  /* *******************************************
  * Method Name: ngOnInit()
  * Access Type: public
  * Input Parameters: none
  * Return Type: void
  * Purpose: Initialize the directive or component after Angular first displays the data-bound properties, builds form data,
  *          and sets the directive or component's input properties.
  *          ngOnInit() is invoked only once when the directive is instantiated.
  * ******************************************* */
  ngOnInit(): void {

    console.log(`Params id = ${this.activatedRoute.snapshot.params['id']}`);
    this.activatedRoute.params.subscribe((params) => {
      if(params['id']){
        this.userService.getUserById(params['id'])
                      .subscribe(serverUser => {
                        this.user = serverUser;
                        console.log(this.user);
                        //this.tempUser.password = this.user.password;

                        //initialzing form with pre-filled values
                        this.updateUser = new FormGroup(
                          {
                            firstName: new FormControl(serverUser['firstName']),
                            lastName: new FormControl(serverUser['lastName']),
                            userName: new FormControl(serverUser['userName']),
                            email: new FormControl(serverUser['email']),
                            phoneNumber: new FormControl(serverUser['phoneNumber']),
                            roleType: new FormControl(serverUser['roleType'])
                          });

                      });//end userService.subscribe()
        }//end if
    });//end activatedRoute.subscribe()
  }

  /* *******************************************
    * Method Name: form()
    * Access Type: public
    * Input Parameters: none
    * Return Type: none
    * Purpose: Getter method to get all of the form controls
    * ******************************************* */
  get form(){
    return this.updateUser.controls;
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
    console.log("form values:");
    console.log(this.updateUser.value); //confirm form values prior to submission
    console.log("this.user = ");
    console.log(this.user);


    this.userObservable = this.userService.updateUser(this.user, this.activatedRoute.snapshot.params['id'] );

    this.userObservable.subscribe( (serverUpdatedUser) =>
    {
      console.log(serverUpdatedUser);
      console.log("Updated User in the database...");
    });//end updateUser.subscribe()

    this.message = true;
  }

  removeMessage(){
    this.message = false;
    //this.resetForm();
  }

}//end class
