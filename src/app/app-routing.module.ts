import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PoductDetailsComponent } from './poduct-details/poduct-details.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { ProductAdminComponent } from './admin/product-admin/product-admin.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, title: 'Home' 
  },
  {
    path: 'product', component: ProductComponent, title: 'Product' 
  },
  {
    path: 'cart', component: CartComponent, title: 'Cart' 
  },
  {
    path: 'checkout', component: CheckoutComponent, title: 'Checkout'
  },
  {
    path: 'signin', component: SigninComponent, title: 'Signin'
  },
  {
    path: 'signup', component: SignupComponent, title: 'Signup'
  },
  {
    path: 'product-details/:id', component: PoductDetailsComponent, title: 'Product-details'
  },
  {
    path: 'contact', component: ContactComponent, title: 'Contact'
  },
  {
    path: 'admin', component: AdminComponent, title: "Admin"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
