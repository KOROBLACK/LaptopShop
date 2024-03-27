import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PoductDetailsComponent } from './poduct-details/poduct-details.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductAdminComponent } from './admin/product-admin/product-admin.component';
import { UserComponent } from './admin/user/user.component';
import { ContactAdminComponent } from './admin/contact-admin/contact-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    SigninComponent,
    SignupComponent,
    PoductDetailsComponent,
    HeaderComponent,
    SearchComponent,
    ContactComponent,
    AdminComponent,
    DashboardComponent,
    ProductAdminComponent,
    UserComponent,
    ContactAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
