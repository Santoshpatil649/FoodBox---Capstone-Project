import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './widgets/header/header.component';
import { ProductComponent } from './models/product/product.component';
import { FooterComponent } from './widgets/footer/footer.component';
import { TruncatePipe } from './truncate.pipe';
import { SearchComponent } from './widgets/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsBarComponent } from './widgets/tags-bar/tags-bar.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { NotFoundComponent } from './widgets/not-found/not-found.component';
import { StarRatingModule } from 'angular-star-rating';
import { RegisterComponent } from './forms/register/register.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';
import { LoginComponent } from './forms/login/login.component';
import { LoginService } from './services/login/login.service';
import { AddProductComponent } from './forms/add-product/add-product.component';
import { RemoveProductComponent } from './forms/remove-product/remove-product.component';
import { ResetPasswordComponent } from './forms/reset-password/reset-password.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product/product.service';
import { UserService } from './services/user/user.service';
import { CartService } from './services/cart/cart.service';
import { TagsBarService } from './services/tags-bar/tags-bar.service';
import { CuisinesBarComponent } from './widgets/cuisines-bar/cuisines-bar.component';
import { EditUsersComponent } from './forms/edit-users/edit-users.component';
import { PhoneNumberFormatPipe } from './phone-number-format.pipe';
import { EditProductsComponent } from './forms/edit-products/edit-products.component';
import { DeleteUserComponent } from './forms/delete-user/delete-user.component';
import { UpdateUserComponent } from './forms/update-user/update-user.component';
import { EditproductComponent } from './forms/editproduct/editproduct.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProductComponent,
    FooterComponent,
    TruncatePipe,
    SearchComponent,
    TagsBarComponent,
    ProductPageComponent,
    CartPageComponent,
    NotFoundComponent,
    RegisterComponent,
    CheckoutPageComponent,
    OrderConfirmationComponent,
    LoginComponent,
    AddProductComponent,
    RemoveProductComponent,
    ResetPasswordComponent,
    CuisinesBarComponent,
    EditUsersComponent,
    PhoneNumberFormatPipe,
    EditProductsComponent,
    DeleteUserComponent,
    UpdateUserComponent,
    EditproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StarRatingModule.forRoot(),
    HttpClientModule
  ],
  providers: [ProductService,
              UserService,
              CartService,
              TagsBarService,
              LoginService
              ], /*Any service providers listed in the root module, will be made avaiable everywhere in the app */
  bootstrap: [AppComponent]
})
export class AppModule { }
