import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Cuisine } from 'src/app/models/Cuisine';
import { CuisineService } from 'src/app/services/cuisine/cuisine.service';

@Component({
  selector: 'app-cuisines-bar',
  templateUrl: './cuisines-bar.component.html',
  styleUrls: ['./cuisines-bar.component.css']
})
export class CuisinesBarComponent implements OnInit {

  //Properties
  cuisines?:Cuisine[];
  @Input()
  justifyContent:string = 'center';

  //Constructor
  constructor(private cuisineService:CuisineService) {
    this.cuisineService.getAllCuisines().subscribe(
      (serverCuisines: Cuisine[]) => {
        this.cuisines = serverCuisines;
        console.log("Cuisines from database:");
        console.log(this.cuisines);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

      );
   }//end constructor

  //Methods
  /* ngOnInit() is only called once */
  ngOnInit(): void {
  }

}//end class
