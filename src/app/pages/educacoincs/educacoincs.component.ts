import { Component, HostListener } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service'; // ← IMPORTANTE

@Component({
  selector: 'app-educacoincs',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './educacoincs.component.html',
  styleUrl: './educacoincs.component.css'
})
export class EducacoincsComponent {

  constructor(private cartService: CartService) {}  // ← INJEÇÃO DO CARRINHO

  isMobileMenuOpen = false;

  banners = [
    "/img/promocoes/promo1.png",
    "/img/promocoes/promo2.png",
    "/img/promocoes/promo3.png",
  ];

  currentBanner = 0;
  intervalTime = 4000; // 4 segundos

  ngOnInit(): void {
    setInterval(() => {
      this.currentBanner = (this.currentBanner + 1) % this.banners.length;
    }, this.intervalTime);
  }

  getTransform() {
    return `translateX(-${this.currentBanner * 100}%)`;
  }

  // 👉 Função para adicionar produto ao carrinho
  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  // 👉 Abrir/fechar menu mobile
  toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const toggleBtn = document.getElementById('mobile-menu-toggle');

    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (mobileMenu) mobileMenu.classList.toggle('active', this.isMobileMenuOpen);
    if (toggleBtn) toggleBtn.classList.toggle('open', this.isMobileMenuOpen);

    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  // 👉 Fecha o menu ao clicar em um link
  closeMobileMenuOnLinkClick() {
    const mobileMenu = document.getElementById('mobile-menu');
    const toggleBtn = document.getElementById('mobile-menu-toggle');

    this.isMobileMenuOpen = false;

    if (mobileMenu) mobileMenu.classList.remove('active');
    if (toggleBtn) toggleBtn.classList.remove('open');

    document.body.style.overflow = '';
  }

  // 👉 Navbar com fundo ao rolar
  @HostListener('window:scroll', [])
  onScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
}
