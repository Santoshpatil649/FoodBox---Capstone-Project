import { CartItem } from "./CartItem";

export class Order{
  orderId!:number;
  items!:CartItem[];
  totalQuantity!:number;
  totalPrice!:number;
  //firstName!:string;
  //lastName!:string;
  //address!:string;
  //paymentId!:number;
  //orderStatus!:string;
}
