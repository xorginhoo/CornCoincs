import { Component, HostListener } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-educacoincs',
  imports: [RouterLink, CommonModule],
  templateUrl: './educacoincs.component.html',
  styleUrl: './educacoincs.component.css'
})
export class EducacoincsComponent {
  isMobileMenuOpen = false;

  banners = [
    "/img/promocoes/promo1.png",
    "/img/promocoes/promo2.png",
    "/img/promocoes/promo3.png",
  ];

  currentBanner = 0;
  intervalTime = 4000; // tempo de troca 4s

  ngOnInit(): void {
    setInterval(() => {
      this.currentBanner = (this.currentBanner + 1) % this.banners.length;
    }, this.intervalTime);
  }

  getTransform() {
    return `translateX(-${this.currentBanner * 100}%)`;
  }


  // 👉 Função para abrir/fechar o menu ao clicar no botão hamburguer
  toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const toggleBtn = document.getElementById('mobile-menu-toggle');

    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (mobileMenu) {
      mobileMenu.classList.toggle('active', this.isMobileMenuOpen);
    }

    if (toggleBtn) {
      toggleBtn.classList.toggle('open', this.isMobileMenuOpen);
    }

    // Quando menu abre → impede o body de rolar
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  // 👉 Fecha o menu ao clicar em qualquer link ou botão dentro dele
  closeMobileMenuOnLinkClick() {
    const mobileMenu = document.getElementById('mobile-menu');
    const toggleBtn = document.getElementById('mobile-menu-toggle');

    this.isMobileMenuOpen = false;

    if (mobileMenu) mobileMenu.classList.remove('active');
    if (toggleBtn) toggleBtn.classList.remove('open');

    document.body.style.overflow = '';
  }

  // 👉 Add background no navbar ao rolar
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
