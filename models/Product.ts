//Define an interface to represent a product
//An interface is a simple class that contains properties

import { Tag } from "./Tag";

//The Product Interface will enforce the structure of the Product object
export default interface Product{
  /* --------- Properties ---------  */
    id: number;
    productImageUrl: string;
    productName: string;
    price: number;
    calories: number;
    rating: number;
    numOfReviews: number;
    description: string;
    //favorite:boolean; //this is a customer specific attribute
    tags:string[];
    cuisines:string[];
}
