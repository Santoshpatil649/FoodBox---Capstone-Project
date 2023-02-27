import { formatCurrency } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { Cuisine } from 'src/app/models/Cuisine';
import { Tag } from 'src/app/models/Tag';
import { CuisineService } from 'src/app/services/cuisine/cuisine.service';
import { ProductService } from 'src/app/services/product/product.service';
import { TagsBarService } from 'src/app/services/tags-bar/tags-bar.service';
import Product from '../../models/Product';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  //Properties
  addProductForm:FormGroup; //form declared
  submitted:boolean = false;
  message:boolean = false;

  newProduct:Product = {
    id:0,
    productImageUrl: '',
    productName: '',
    price: 0,
    calories: 0,
    rating: 0,
    numOfReviews: 0,
    description: '',
    tags: [],
    cuisines: []
    };

  //tempProduct will be assigned the values from the add product form
  tempProduct:Product = {
    id: 0,
    productImageUrl: '',
    productName: '',
    price: 0,
    calories: 0,
    rating: 0,
    numOfReviews: 0,
    description: '',
    tags: [],
    cuisines: []
  };

  //Observables for database connections
  productObservable:Observable<Product>;
  tagObservable:Observable<Tag>;
  tagsObservable:Observable<Tag[]>;
  cuisinesObservable:Observable<Cuisine[]>;
  cuisineObservable:Observable<Cuisine>;

  //Other properties
  tagsFromDB:Tag[]=[];
  tag:Tag = new Tag();
  cuisine:Cuisine = new Cuisine();
  cuisinesFromDB:Cuisine[]=[];

  //Constructor
  constructor(private builder:FormBuilder,
              private productService:ProductService,
              private tagsBarService:TagsBarService,
              private cuisineService:CuisineService,
              private router:Router) {

    /* Lesson Learned: Had to move the tags & cuisines observable declarations to the constructor.
     * It affected program execution doing so in the addProduct() method
     * */

    this.tagsObservable =  this.tagsBarService.getAllTags();

    this.tagsObservable.subscribe((serverTags: Tag[]) => {
        this.tagsFromDB = serverTags;
      });//end tagsObservable.subscribe

    this.cuisinesObservable = this.cuisineService.getAllCuisines();

    this.cuisinesObservable.subscribe((serverCuisines: Cuisine[]) => {
        this.cuisinesFromDB = serverCuisines;
      }); //end cuisinesObservable.subscribe

   }

  // Methods
  ngOnInit(): void {
    this.addProductForm = this.builder.group({
      pname: ['', Validators.required],
      pprice: ['', Validators.required],
      pcalories: [''],
      prating:['', Validators.compose([Validators.min(0),Validators.max(5)])],
      pnumrevs:[''],
      pimagename:['', Validators.required],
      pdescription:[''],
      ptags:[''],
      pcuisines:['']
    })
  }

  /* *******************************************
   * Method Name: getFormControls()
   * Access Type: public
   * Input Parameters: none
   * Return Type: none
   * Purpose: Getter method to get all of the form controls
   * ******************************************* */
    get getFormControls(){
      return this.addProductForm.controls;
    }

  /* *******************************************
   * Method Name: onSubmit()
   * Access Type: public
   * Input Parameters: none
   * Return Type: none
   * Purpose:
   * ******************************************* */
  onSubmit(){
    this.submitted = true;
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
    for(let control in this.addProductForm.controls){
      this.addProductForm.controls[control].setValue('');
      this.addProductForm.controls[control].setErrors(null);
    }
  }

  /* *******************************************
   * Method Name: addProduct()
   * Access Type: public
   * Input Parameters: none
   * Return Type: none
   * Purpose: Add the new product entered from the form to the database
   * ******************************************* */
  addProduct(){
    console.log("Printing out the Form Data in JSON format..");
    console.log(this.addProductForm.value); //form data in JSON format
    console.log(this.addProductForm.controls['ptags'].value);
    console.log(this.addProductForm.controls['pcuisines'].value);

    if(this.addProductForm.invalid){
      console.log("form is invalid...");
      return; //don't allow the user to submit the form
    }
    else{
      console.log("tempProduct object..");
      console.log(this.tempProduct);

      //refine the tags and cuisines properties
      this.tempProduct.tags = this.addProductForm.controls['ptags'].value.split(', ');
      this.tempProduct.cuisines = this.addProductForm.controls['pcuisines'].value.split(', ');

      //Now, add the tempProduct to the database using the productService
      this.productObservable = this.productService.addProduct(this.tempProduct);
      this.productObservable.subscribe( (newlyAddedProduct) =>{

          this.newProduct = newlyAddedProduct;
          console.log("Added the new product to the database..");

          console.log("Refreshing the database tables for Tags & Cuisines..");
          this.refreshTables();
      });//end productObservable.subscribe

      this.message = true;
    }//end else
  }

  /* *******************************************
   * Method Name: refreshTablesDB()
   * Access Type: public
   * Input Parameters: none
   * Return Type: void
   * Purpose: To call the Tags & Cuisines refresh methods
   * ******************************************* */
  refreshTables(){
    for(var i=0;i<this.newProduct.tags.length;i++){
      var testString = this.newProduct.tags[i].toLowerCase();
      this.refreshTagsTableDB(testString);
    }

    for(var j=0; j<this.newProduct.cuisines.length;j++){
       var testString = this.newProduct.cuisines[j];
       testString = testString.charAt(0).toUpperCase() + testString.substring(1).toLowerCase();
       //console.log(testString);
       this.refreshCuisinesTableDB(testString);
    }
  }

  /* *******************************************
   * Method Name: refreshTagsTableDB()
   * Access Type: public
   * Input Parameters: String to test for existsence in the database
   * Return Type: void
   * Purpose: On click, reset the status of the message and reset the form
   * TODO: This should be method in the tagsBarService
   * ******************************************* */
  refreshTagsTableDB(str:string){

    var tempTag:Tag = new Tag();
    var notFound:boolean = true;
    var cmp:string = "";

    //Note: I wanted to use the find.includes method as my base logic, but I was running out of time to make it work
    console.log("find()..includes(str)=" );
    console.log(this.tagsFromDB.find( tag => tag.tagName.includes(str))); //returns an Tag object or undefined if no match  (confirmed logic)

    for(var j of this.tagsFromDB){
      cmp = j.tagName.toLowerCase();

       if( cmp === str ){
          console.log("The tag exists in the table. No need to create a new one");
          notFound = false;
          return;
        }//end if
    }//end for-of loop

    //no match, so create a new Tag object and add that tag to the database
    if(notFound){

      //no need to assign a value to id property, as it will get auto assigned in the database
      tempTag.tagName = str;
      tempTag.productCount = 1;

      this.tagObservable = this.tagsBarService.addTag(tempTag);

      this.tagObservable.subscribe( (serverTag) =>{
          console.log("Added Tag to the database..");
          console.log("The new Tag retrieved from database...");
          console.log(serverTag);

          //reset the tempTag values
          tempTag.tagName="";
          tempTag.productCount=0;
      });//end tagObservable.subscribe
    }//end if
  }


  /* *******************************************
   * Method Name: refreshCuisinesTableDB()
   * Access Type: public
   * Input Parameters: String to test for existsence in the database
   * Return Type: void
   * Purpose:
   * TODO: This should be function in the cuisineService
   * ******************************************* */
  refreshCuisinesTableDB(str:string){

    var tempCuisine:Cuisine = new Cuisine();
    var notFound:boolean = true;
    var cmp:string = "";

    //Note: I wanted to use the find.includes method as my base logic, but I was running out of time to make it work
    console.log("find()..includes(str)=" );
    console.log(this.cuisinesFromDB.find( cuisine => cuisine.cuisineName.includes(str)));
    //console.log(this.cuisinesFromDB.filter(cuisine => cuisine.cuisineName.includes(str))); //returns Cuisine object or undefined if no match  (confirmed logic)

    for(var j of this.cuisinesFromDB){
      cmp = j.cuisineName;

      if( cmp === str ){
        console.log("The cuisine exists in the table. No need to create a new one");
        notFound = false;
        return;
      }//end if
    }//end for

    //no match, so create a new Cuisine object and add that cuisine to the database
    if(notFound){
      tempCuisine.cuisineName = str;
      tempCuisine.productCount = 1;
      console.log(tempCuisine);

      this.cuisineObservable = this.cuisineService.addCuisine(tempCuisine);
      this.cuisineObservable.subscribe( (serverCuisine) =>{
        console.log("Added Cuisine to the database..");
        console.log("The new Cuisine object retrieved from database...");
        console.log(serverCuisine);

        //reset the tempCuisine values
        tempCuisine.cuisineName="";
        tempCuisine.productCount=0;
      });//end cuisineObservable.subscribe
    }//end if
  }

}//end class
