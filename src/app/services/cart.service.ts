import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'cart_items';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  getItems() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveItems(items: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  addToCart(item: any) {   // <<<<<<<<<<<< AQUI! ELE TEM QUE EXISTIR!
    const items = this.getItems();
    items.push(item);
    this.saveItems(items);
  }

  removeItem(index: number) {
    const items = this.getItems();
    items.splice(index, 1);
    this.saveItems(items);
  }

  clear() {
    this.saveItems([]);
  }

  getSubtotal() {
    const items = this.getItems();
    return items.reduce((total: number, item: any) => total + item.price, 0);
  }
}
