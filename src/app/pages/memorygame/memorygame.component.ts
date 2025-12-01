import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-memorygame',
  imports: [RouterLink],
  templateUrl: './memorygame.component.html',
  styleUrls: ['./memorygame.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MemorygameComponent implements AfterViewInit {

  items: string[] = [
    'guguCard',
    'mimooCard',
    'ticoCard',
    'taurusCard',
    'veveCard'
  ];

  firstCard: HTMLElement | null = null;
  secondCard: HTMLElement | null = null;

  somAtivo = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadGame();
    this.configurarSom();
  }

  // ----------------------------------------------------------------------
  // SOM
  // ----------------------------------------------------------------------

  configurarSom() {
    const musica: HTMLAudioElement | null = this.el.nativeElement.querySelector('#musicaFundo');
    const botaoSom: HTMLElement | null = this.el.nativeElement.querySelector('#botaoSom');

    if (!musica || !botaoSom) return;

    botaoSom.innerHTML = '<i class="fa-solid fa-volume-high"></i>';

    musica.play().catch(err => {
      console.log('Autoplay bloqueado:', err);
      this.somAtivo = false;
      botaoSom.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    });

    botaoSom.addEventListener('click', () => {
      this.somAtivo = !this.somAtivo;

      if (this.somAtivo) {
        musica.play();
        botaoSom.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      } else {
        musica.pause();
        botaoSom.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      }
    });
  }

  // ----------------------------------------------------------------------
  // CARTAS
  // ----------------------------------------------------------------------

  revealCard(event: Event) {
    const target = event.target as HTMLElement;
    const card = target.parentElement as HTMLElement;

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

  checkCards() {
    if (!this.firstCard || !this.secondCard) return;

    const firstItem = this.firstCard.getAttribute('data-item');
    const secondItem = this.secondCard.getAttribute('data-item');

    if (firstItem === secondItem) {

      this.firstCard.querySelector('.front')?.classList.add('disabled-card');
      this.secondCard.querySelector('.front')?.classList.add('disabled-card');

      this.firstCard = null;
      this.secondCard = null;

      this.checkEndGame();

    } else {
      setTimeout(() => {
        this.firstCard?.classList.remove('reveal-card');
        this.secondCard?.classList.remove('reveal-card');

        this.firstCard = null;
        this.secondCard = null;
      }, 500);
    }
  }

  checkEndGame() {
    const disabled = this.el.nativeElement.querySelectorAll('.disabled-card');

    if (disabled.length === 10) {

      const alertDiv = this.renderer.createElement('div');
      alertDiv.className = 'victory-alert';
      alertDiv.innerHTML = `
        <h2>Parabéns!</h2>
        <p>Você completou o jogo!</p>
        <button class="restart-button">Jogar novamente</button>
      `;

      this.renderer.appendChild(document.body, alertDiv);

      const restartBtn = alertDiv.querySelector('.restart-button');
      restartBtn?.addEventListener('click', () => {
        alertDiv.remove();
        this.resetGame();
      });
    }
  }

  resetGame() {
    const grid: HTMLElement = this.el.nativeElement.querySelector('.grid');
    grid.innerHTML = '';
    this.loadGame();
  }

  createCard(item: string): HTMLElement {
    const card = this.renderer.createElement('div');
    this.renderer.addClass(card, 'card');

    const front = this.renderer.createElement('div');
    this.renderer.addClass(front, 'face');
    this.renderer.addClass(front, 'front');
    front.style.backgroundImage = `url('../../img/cards/${item}.svg')`;

    const back = this.renderer.createElement('div');
    this.renderer.addClass(back, 'face');
    this.renderer.addClass(back, 'back');
    back.style.backgroundImage = `url('../../img/cards/cornCard.svg')`;

    card.appendChild(front);
    card.appendChild(back);

    this.renderer.listen(card, 'click', (event) => this.revealCard(event));

    card.setAttribute('data-item', item);

    return card;
  }

  loadGame() {
    const grid: HTMLElement = this.el.nativeElement.querySelector('.grid');

    const duplicateItems = [...this.items, ...this.items];
    const shuffled = duplicateItems.sort(() => Math.random() - 0.5);

    shuffled.forEach(item => {
      const card = this.createCard(item);
      grid.appendChild(card);
    });
  }
}
