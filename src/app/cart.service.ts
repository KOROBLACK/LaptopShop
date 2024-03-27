import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: any[] = []

  getCart(){
    return this.cart
  }

  deleteCart(product_checkout :any){
    this.cart = this.cart.filter(item => !product_checkout.includes(item))
  }

  delete(index: number) {
    this.cart.splice(index, 1);
  }

  addCart(item: any, id: number){
    let index = this.cart.findIndex(item =>{
      return item.id == id
    })
       
    if (index == -1){
      this.cart.push(item)

    }
    else{
      this.cart[index] = item
    }
  }

  constructor() { }
}
