import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {

  items: any[] = [];
  subtotal: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.items = this.cartService.getItems();
    this.subtotal = this.cartService.getSubtotal();
  }

  remove(index: number) {
    this.cartService.removeItem(index);
    this.loadCart(); // atualiza tela
  }

  clearCart() {
    this.cartService.clear();
    this.loadCart();
  }
}
