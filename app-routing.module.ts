import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './forms/login/login.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RegisterComponent } from './forms/register/register.component';
import { AddProductComponent } from './forms/add-product/add-product.component';
import { RemoveProductComponent } from './forms/remove-product/remove-product.component';
import { ResetPasswordComponent } from './forms/reset-password/reset-password.component';
import { EditUsersComponent } from './forms/edit-users/edit-users.component';
import { EditProductsComponent } from './forms/edit-products/edit-products.component';
import { UpdateUserComponent } from './forms/update-user/update-user.component';
import { DeleteUserComponent } from './forms/delete-user/delete-user.component';
import { EditproductComponent } from './forms/editproduct/editproduct.component';

//Declare your routes in the constant routes array
//Specify the path of the route and the component that maps to it
const routes: Routes = [
  {path:'', component:RegisterComponent}, // '' is the landing page for the application
  {path: 'home', component:HomeComponent},
  {path:'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'search/:searchTerm', component:HomeComponent}, //we are showing our products inside of the home component for this application
  {path: 'products/tag/:desiredTag', component:HomeComponent}, //localhost:4200/products/tag/pantry
  {path: 'products/cuisine/:desiredCuisine', component:HomeComponent}, //localhost:4200/products/cuisine/Indian
  {path: 'product/:id', component:ProductPageComponent}, //localhost:4200/products/product/id
  {path: 'cart-page', component:CartPageComponent},
  {path: 'checkout', component:CheckoutPageComponent},
  {path: 'order-confirmation', component:OrderConfirmationComponent},
  {path: 'addProduct', component:AddProductComponent},
  {path: 'removeProduct', component:RemoveProductComponent},
  {path: 'resetpw/:id', component:ResetPasswordComponent},
  {path: 'logout', component:LoginComponent},
  {path: 'editUsers', component:EditUsersComponent},
  {path: 'editProducts', component:EditProductsComponent},
  {path: 'updateProduct/:id', component:EditproductComponent},
  {path: 'edit/:id', component:UpdateUserComponent},
  {path: 'delete/:id', component:DeleteUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
