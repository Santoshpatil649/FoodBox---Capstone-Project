import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  //Properties
  deletedUser:User=new User();

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
  * Purpose: Build the login form.
  *          ngOnInit() is invoked only once when the directive is instantiated.
  * ******************************************* */
  ngOnInit(): void {

    console.log(`Params id = ${this.activatedRoute.snapshot.params['id']}`);
    this.activatedRoute.params.subscribe((params) => {

      if(params['id']){
        this.userService.getUserById(params['id']).subscribe( (serverUser) => {
          this.deletedUser = serverUser;
          console.log("User to be deleted: ");
          console.log("User id = " + this.deletedUser.id);
          console.log(this.deletedUser);
          console.log("Getting ready to call the HTTP delete method from the userService...");

          /* The component isn't expecting a result from the delete operation, so it subscribes without a callback.
             Even though you are not using the result, you still have to subscribe.
             Calling the subscribe() method executes the observable, which is what initiates the DELETE request. */
          this.userService.deleteUserById(params['id']).subscribe();
          console.log("Removed User from the Food Box database...");
        });
      }//end if

    });//end activatedRoute.subscribe()
  }

}//end class
