import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/CartItem';
import Product from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //Properties
  private cart:Cart = this.getCartFromLocalStorage();

  /* Observables provide support for passing messages between part of your application
   * The observer pattern is a software design pattern in which an object, called the subject, maintains a list of its dependents,
   * called observers, and notifies them automatically of state changes. Observables are declarative — that is, you define a function
   * for publishing values, but it is not executed until a consumer subscribes to it.
   * The subscribed consumer then receives notifications until the function completes, or until they unsubscribe.
   * Source: https://angular.io/guide/observables
   */
  /* A Subject is a special type of Observable which shares a single execution path among observers.
   * Source: https://www.learnrxjs.io/
   *
   * Behavior Subject: A variant of Subject that requires an initial value and emits its current value whenever it is subscribed to.
   * Source: https://rxjs-dev.firebaseapp.com/api/index/class/BehaviorSubject
   */
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  //Constructor
  constructor(){

  }


  //Methods
  /* *******************************************
   * Method Name: addToCart()
   * Access Type: public
   * Input Parameters: Product object
   * Return Type: void
   * Purpose: Add the Product object to the Cart and set cart to local storage for data persistence
   * ******************************************* */
  addToCart(product:Product):void{

    //Let's find the cartItem by using the built-in method of find()
    let cartItem = this.cart.items.find(item => item.product.id === product.id)

    //if the Product object is already added to the cart, do nothing
    if(cartItem){
      return;
    }
    //else, add the item to the items[] array
    this.cart.items.push(new CartItem(product));
    this.setCartToLocalStorage(); //since we changed the Cart contents, we set cart to local storage for data persistence
  }

  /* *******************************************
   * Method Name: removeFromCart()
   * Access Type: public
   * Input Parameters: Product ID
   * Return Type: void
   * Purpose: Remove the target Product ID from the items[] array and set cart to local storage for data persistence
   * ******************************************* */
  removeFromCart(productId:number):void{
    this.cart.items =
    this.cart.items.filter(item => item.product.id != productId); //removing the product with productId from the cartItems array
    this.setCartToLocalStorage(); //since we changed the Cart contents, we set cart to local storage for data persistence

  }

  /* *******************************************
   * Method Name: changeQuantity()
   * Access Type: public
   * Input Parameters: Product ID, Quantity
   * Return Type:
   * Purpose: Update the product quanity and update the cart in local storage for data persistence
   * ******************************************* */
  changeQuanity(productId:number, quantity:number){
    let cartItem = this.cart.items.find(item => item.product.id === productId)
    if(!cartItem)
      return; //will bypass any compile errors
    else{
      cartItem.quantity = quantity;
      cartItem.price = cartItem.quantity * cartItem.product.price;
      this.setCartToLocalStorage(); //since we changed the Cart contents, we set cart to local storage for data persistence
    }
  }

  /* *******************************************
   * Method Name: clearCart()
   * Access Type: public
   * Input Parameters: none
   * Return Type: none
   * Purpose: Defines a new instance of Cart object with empty contents; save it to local storage
   * ******************************************* */
  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage(); //since we changed the Cart contents, we set cart to local storage for data persistence
  }

  /* *******************************************
   * Method Name: getCartObservable()
   * Access Type: public
   * Input Parameters: none
   * Return Type: Observable<Cart> - will return a Cart that is an observable object (real-time fetch of the data)
   * Purpose: create a method to fetch the Cart object from the API (converts BehaviorSubject to an Observable object)
   *          any changes to the cart should happen inside the cart service
   * ******************************************* */
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  /* *******************************************
   * Method Name: getCart()
   * Access Type: public
   * Input Parameters: none
   * Return Type: Cart object
   * Purpose: Returns the latest value of the Cart (since subject always keeps track of the lastest value of the subject)
   * ******************************************* */
  getCart():Cart{
    return this.cartSubject.value;
  }

/* *******************************************
   * Method Name: setCartToLocalStorage()
   * Access Type: private
   * Input Parameters: none
   * Return Type: void
   * Purpose: Convert the Cart object to a JSON string
   * ******************************************* */
  private setCartToLocalStorage():void{

    /* We will use the reduce() method executes a user-supplied "reducer" callback function on each element of the array,
     * in order, passing in the return value from the calculation on the preceding element.
     * The final result of running the reducer across all elements of the array is a single value.
     * The first time that the callback is run there is no "return value of the previous calculation".
     * If supplied, an initial value may be used in its place. Otherwise the array element at index 0 is used as the initial value and
     * iteration starts from the next element (index 1 instead of index 0).
     * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
     */
    this.cart.totalPrice = this.cart.items.
                           reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);

    this.cart.totalCount = this.cart.items.
                           reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    /* The JSON.stringify() method converts a JavaScript value to a JSON string, optionally replacing values if a replacer function
     * is specified or optionally including only the specified properties if a replacer array is specified.
     * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
     */
    const cartJson = JSON.stringify(this.cart); //represents the cart as a JSON string

    /* The localStorage read-only property of the window interface allows you to access a Storage object for the Document's origin;
     * the stored data is saved across browser sessions.
     * localStorage is similar to sessionStorage, except that while localStorage data has no expiration time,
     * sessionStorage data gets cleared when the page session ends — that is, when the page is closed.
     * (localStorage data for a document loaded in a "private browsing" or "incognito" session is cleared when the last "private" tab is closed.)
     * Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
     */
    localStorage.setItem('Cart', cartJson); //key: "Cart", value: cart as a JSON string; when we set localStorage, that means we are changing the cart
    this.cartSubject.next(this.cart); //notify any listeners of the Cart observable. To feed a new value to the Subject, just call next(theValue), and it will be multicasted to the Observers registered to listen to the Subject.

  }

/* *******************************************
   * Method Name: getCartFromLocalStorage()
   * Access Type: private
   * Input Parameters: none
   * Return Type: Cart object
   * Purpose: Get the Cart from Local Storage (to persist the cart)
   * ******************************************* */
  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart'); //use the key that we defined in the corresponding set function
    return cartJson ? JSON.parse(cartJson) : new Cart();
    /* The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string.
     * An optional reviver function can be provided to perform a transformation on the resulting object before it is returned.
     * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
     * */

  }
}//end class
