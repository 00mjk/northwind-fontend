import { Injectable } from '@angular/core';
import { CartItems } from '../models/cartItems';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(product: Product) {
    let item = CartItems.find((c) => c.product.productId === product.productId); //foreach gibi find da arama yapar.
    if (item) {
      //varsa
      item.quantity += 1; //varsa 1 artırır.
    } else {
      let cartItem = new CartItem(); //yeni obje oluşturduk
      cartItem.product = product;
      cartItem.quantity = 1;
      CartItems.push(cartItem); //Arraya eklemek için push kullanılır javascript'de
    }
  }

  removeFromCart(product:Product){
    let item:CartItem=CartItems.find(c=>c.product.productId===product.productId);
    CartItems.splice(CartItems.indexOf(item),1); //burası silme yapar. index'ini bulur 1 index siler.
  }
  list(): CartItem[] {
    return CartItems;
  }
}
