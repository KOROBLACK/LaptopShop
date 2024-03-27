import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  checkout: any[] = []

  getCheckout(){
    return this.checkout
  }

  deleteCheckout(){
    this.checkout = []
  }

  addCheckOut(item: any){
    this.checkout.push(item)
  }

  constructor() { }
}
