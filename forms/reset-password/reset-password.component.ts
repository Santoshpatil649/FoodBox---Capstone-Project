import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  //Properties
  resetPasswordForm:FormGroup; //form declared
  isSubmitted:boolean = false;
  message:boolean = false;
  currentUser:User=new User();

  //Constructor
  constructor(private builder:FormBuilder,
              private userService:UserService,
              private activatedRoute:ActivatedRoute,
              private router:Router) {
    }

  /* *******************************************
   * Method Name: ngOnInit()
   * Access Type: public
   * Input Parameters: none
   * Return Type: void
   * Purpose: Build the login form.
   *          ngOnInit() is invoked only once when the directive is instantiated.
   * ******************************************* */
  ngOnInit(): void {

    console.log(this.activatedRoute.snapshot.params['id']);
    this.activatedRoute.params.subscribe((params) => {
      if(params['id'])
        this.userService.getUserById(params['id']).subscribe(serverUser => {
                        this.currentUser = serverUser;
                        console.log(serverUser);
                        console.log(this.currentUser);
                      });

    });

    this.resetPasswordForm = this.builder.group(
      {
        currentPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]]
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
    return this.resetPasswordForm.controls;
  }

  /* *******************************************
   * Method Name: onSubmit()
   * Access Type: public
   * Input Parameters: none
   * Return Type: void
   * Purpose: The "Reset Password" button is a submit button. For this form, the ngSubmit event is bound to the onSubmit() method
   * ******************************************* */
  onSubmit(){

    //CurrentPassword must match the existing password from the database
    //console.log(this.resetPasswordForm.value); //prints form values in json format
    if(this.getFormControls['currentPassword'].value && this.currentUser.password){
      console.log("Condition 1:2 Passed - Current Password on the Form MATCHES the password for the User on the database");
      //Set the newPassword to the user stored in the database
        console.log("Condition 2:2 Passed - Current Password on the Form MATCHES the New Password on the Form");
        let tempUser:User = this.currentUser;
        tempUser.password = this.getFormControls['newPassword'].value;
        console.log(tempUser);
        this.userService.updateUser(tempUser, this.currentUser.id).subscribe(); //don't forget to subscribe to the observable. otherwise, the change will not take!!
        this.isSubmitted = true;
        this.message = true;
        this.resetPasswordForm.reset({});
        this.getFormControls['currentPassword'].setValue('');
        this.getFormControls['newPassword'].setValue('');
        return;
    }

    console.log("Failed to reset password...");
    this.isSubmitted = false;
    this.resetPasswordForm.invalid;
    return;
  }

  /* *******************************************
   * Method Name: removeMessage()
   * Access Type: public
   * Input Parameters: none
   * Return Type: void
   * Purpose: On click, reset the status of the message and reset the form
   * ******************************************* */
  removeMessage(){
    this.message = false;
    this.resetForm();
  }

  /* *******************************************
   * Method Name: resetForm()
   * Access Type: public
   * Input Parameters: none
   * Return Type: void
   * Purpose: Reset the formcontrol values and validators
   * ******************************************* */
  resetForm(){
    for(let control in this.resetPasswordForm.controls){
      this.resetPasswordForm.controls[control].setValue('');
      this.resetPasswordForm.controls[control].setErrors(null);
    }
  }

}//end class
