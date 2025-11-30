import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-memorygame',
  imports: [RouterLink],
  templateUrl: './memorygame.component.html',
  styleUrls: ['./memorygame.component.css']
})
export class MemorygameComponent implements AfterViewInit {

  @ViewChild('grid', { static: false }) grid!: ElementRef<HTMLDivElement>;
  @ViewChild('musicaFundo', { static: false }) musica!: ElementRef<HTMLAudioElement>;
  @ViewChild('botaoSom', { static: false }) botaoSom!: ElementRef<HTMLButtonElement>;

  somAtivo = true;

  items: string[] = [
    'guguCard',
    'mimooCard',
    'ticoCard',
    'taurusCard',
    'veveCard'
  ];

  // agora tipado corretamente como HTMLElement | null
  firstCard: HTMLElement | null = null;
  secondCard: HTMLElement | null = null;

  ngAfterViewInit(): void {
    this.inicializarSom();
    this.loadGame();
  }

  // -------------------- SOM --------------------
  inicializarSom(): void {
    const musicaEl = this.musica?.nativeElement;
    const botaoEl = this.botaoSom?.nativeElement;

    if (!musicaEl || !botaoEl) return;

    botaoEl.innerHTML = '<i class="fa-solid fa-volume-high"></i>';

    musicaEl.play().catch(() => {
      this.somAtivo = false;
      botaoEl.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    });

    botaoEl.addEventListener('click', () => {
      this.somAtivo = !this.somAtivo;

      if (this.somAtivo) {
        musicaEl.play();
        botaoEl.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      } else {
        musicaEl.pause();
        botaoEl.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      }
    });
  }

  // -------------------- JOGO --------------------
  private createElement(tag: string, className: string): HTMLElement {
    const el = document.createElement(tag);
    el.className = className;
    return el;
  }

  private checkEndGame(): void {
    const disabledCards = document.querySelectorAll('.disabled-card');

    // 10 cartas correspondem a 5 pares duplicados x 2 => ajuste conforme seu total real
    if (disabledCards.length === 10) {
      const victoryAlert = document.createElement('div');
      victoryAlert.className = 'victory-alert';
      victoryAlert.innerHTML = `
        <h2>Parabéns!</h2>
        <p>Você completou o jogo!</p>
        <button class="restart-button">Jogar novamente</button>
      `;

      document.body.appendChild(victoryAlert);

      const restartButton = victoryAlert.querySelector('.restart-button') as HTMLButtonElement | null;
      if (restartButton) {
        restartButton.addEventListener('click', () => {
          victoryAlert.remove();
          this.resetGame();
        });
      }
    }
  }

  private resetGame(): void {
    if (!this.grid) return;
    this.grid.nativeElement.innerHTML = '';
    this.firstCard = null;
    this.secondCard = null;
    this.loadGame();
  }

  private checkCards(): void {
    if (!this.firstCard || !this.secondCard) return;

    const firstItem = this.firstCard.getAttribute('data-item');
    const secondItem = this.secondCard.getAttribute('data-item');

    if (firstItem === secondItem) {
      // marca apenas a face da frente (firstElementChild pode ser null)
      const fChild = this.firstCard.firstElementChild as HTMLElement | null;
      const sChild = this.secondCard.firstElementChild as HTMLElement | null;

      if (fChild) fChild.classList.add('disabled-card');
      if (sChild) sChild.classList.add('disabled-card');

      this.firstCard = null;
      this.secondCard = null;

      this.checkEndGame();
    } else {
      setTimeout(() => {
        // garante que não é null antes de usar
        if (this.firstCard) this.firstCard.classList.remove('reveal-card');
        if (this.secondCard) this.secondCard.classList.remove('reveal-card');

        this.firstCard = null;
        this.secondCard = null;
      }, 500);
    }
  }

  revealCard(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    // o "card" é o elemento pai; pode ser null
    const card = target.parentElement as HTMLElement | null;
    if (!card) return;

    if (card.classList.contains('reveal-card')) return;

    if (!this.firstCard) {
      card.classList.add('reveal-card');
      this.firstCard = card;
    } else if (!this.secondCard) {
      card.classList.add('reveal-card');
      this.secondCard = card;
      this.checkCards();
    }
  }

  private createCard(item: string): HTMLElement {
    const card = this.createElement('div', 'card');
    const front = this.createElement('div', 'face front');
    const back = this.createElement('div', 'face back');

    
    front.style.backgroundImage = `url('/img/cards/${item}.svg')`;
    back.style.backgroundImage = `url('/img/cards/cornCard.svg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', (e) => this.revealCard(e));
    card.setAttribute('data-item', item);

    return card;
  }

  private loadGame(): void {
    if (!this.grid) return;

    const duplicateItems = [...this.items, ...this.items];
    const shuffledArray = duplicateItems.sort(() => Math.random() - 0.5);

    shuffledArray.forEach(item => {
      const card = this.createCard(item);
      this.grid.nativeElement.appendChild(card);
    });
  }
}
