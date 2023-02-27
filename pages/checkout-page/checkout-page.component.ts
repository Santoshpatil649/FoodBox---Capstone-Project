import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cart } from '../../models/Cart';
import { Order } from '../../models/Order';
import { CartService } from '../../services/cart/cart.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {


  /* --------- Properties --------- */
  order:Order = new Order();

  /* --------- Constructor --------- */
  //inject several key dependencies
  constructor(cartService:CartService) {

      //1. Get the latest value of the Cart from the Cart Service
      const cart = cartService.getCart();

      //2. Set the Order object's items array to the current CartItems
      this.order.items = cart.items;
      this.order.totalQuantity = cart.totalCount;

      //3. Set the Order object's totalPrice property to the current Cart's total price property
      this.order.totalPrice = cart.totalPrice;
   }

  /* --------- Methods --------- */
  ngOnInit(): void {
  }

}
