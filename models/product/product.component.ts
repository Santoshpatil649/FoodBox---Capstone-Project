import { Component, Input, OnInit } from '@angular/core';
import Product from '../Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // decorate the 'data' property with @Input(); the values will come from the parent
  @Input() data: Product = {
    id:0,
    productImageUrl: '',
    productName: '',
    price: 0,
    calories: 0,
    rating: 0,
    numOfReviews: 0,
    description: '',
    //favorite: false,
    tags: [],
    cuisines: []
    };


  constructor() {
   }

  ngOnInit(): void {
  }

}
