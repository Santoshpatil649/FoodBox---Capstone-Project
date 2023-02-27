import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  //Properties
  public users:User[]=[];
  user:User; //will be shared
  userName:String;

  //Observables for database connections
  userObservable:Observable<User>;
  usersObservable:Observable<User[]>;

  //Constructor
  constructor(private userService:UserService,
              private router:Router) {
    //1. Assign the usersObservable
    this.usersObservable = this.userService.getAllUsers();

    //2. Subscribe to the usersObservable and assign the local users[]
    this.usersObservable.subscribe((serverUsers) => {
    this.users = serverUsers;
    console.log("All of the Users from the database..");
    console.log(this.users);
    })//end usersObservable.subscribe
  }

  //Methods
  ngOnInit(): void { }


  resetPassword(user:User):void{
    //1. Assign the usersObservable
    this.userObservable = this.userService.getUserById(user.id);

    //2. Subscribe to the usersObservable and assign the local users[]
    this.userObservable.subscribe((serverUser) => {
    this.user = serverUser;
    this.userName = user.userName;
    console.log(this.user);
    })//end usersObservable.subscribe

    console.log("Inside resetPassword()...");
    console.log(user);

    //Calling the resetPassword form and passing it the user from the userservice
    this.router.navigate(['/resetpw']);
  }

}//end class
