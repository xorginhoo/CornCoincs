import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  // Elementos com tipagem adequada
  private musica!: HTMLAudioElement;
  private botaoSom!: HTMLElement;
  private btnConfig!: HTMLElement;
  private menuConfig!: HTMLElement;
  private logoutBtn!: HTMLElement;

  // Estado do componente
  somAtivo: boolean = true;

  ngOnInit(): void {
    this.initializeElements();
    this.setupEventListeners();
    this.setInitialAudioState();
  }

  ngOnDestroy(): void {
    // Limpeza para evitar memory leaks
    this.removeEventListeners();
  }

  private initializeElements(): void {
    this.musica = document.getElementById("musicaFundo") as HTMLAudioElement;
    this.botaoSom = document.getElementById("botaoSom") as HTMLElement;
    this.btnConfig = document.getElementById("configuracao") as HTMLElement;
    this.menuConfig = document.getElementById("menuConfig") as HTMLElement;
    this.logoutBtn = document.getElementById("logoutBtn") as HTMLElement;

    // Verifica se todos os elementos foram encontrados
    this.validateElements();
  }

  private validateElements(): void {
    const elements = [
      { element: this.musica, name: 'musicaFundo' },
      { element: this.botaoSom, name: 'botaoSom' },
      { element: this.btnConfig, name: 'configuracao' },
      { element: this.menuConfig, name: 'menuConfig' },
      { element: this.logoutBtn, name: 'logoutBtn' }
    ];

    elements.forEach(({ element, name }) => {
      if (!element) {
        console.error(`Elemento não encontrado: ${name}`);
      }
    });
  }

  private setupEventListeners(): void {
    // Configuração do menu
    if (this.btnConfig && this.menuConfig) {
      this.btnConfig.addEventListener("click", this.toggleMenuConfig.bind(this));
    }

    // Logout
    if (this.logoutBtn) {
      this.logoutBtn.addEventListener("click", this.handleLogout.bind(this));
    }

    // Controle de áudio
    if (this.botaoSom) {
      this.botaoSom.addEventListener("click", this.toggleAudio.bind(this));
    }
  }

  private removeEventListeners(): void {
    // Em uma aplicação real, você removeria os event listeners aqui
    // Mas como estamos usando bind, isso cria novas funções
    // Em produção, considere usar Observable.fromEvent e unsubscribe
  }

  private setInitialAudioState(): void {
    if (!this.botaoSom || !this.musica) return;

    // Define o ícone inicial
    this.botaoSom.innerHTML = '<i class="fa-solid fa-volume-high"></i>';

    // Tenta reproduzir o áudio
    if (this.musica) {
      this.musica.play().catch((erro: Error) => {
        console.log("Autoplay bloqueado pelo navegador:", erro);
        this.somAtivo = false;
        if (this.botaoSom) {
          this.botaoSom.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        }
      });
    }
  }

  private toggleMenuConfig(): void {
    if (!this.menuConfig) return;
    
    const currentDisplay = this.menuConfig.style.display;
    this.menuConfig.style.display = currentDisplay === "flex" ? "none" : "flex";
  }

  private handleLogout(): void {
    alert("Você saiu da conta!");
    // Redirecionamento real (descomente quando implementar):
    // this.router.navigate(['/login']);
  }

  private toggleAudio(): void {
    if (!this.musica || !this.botaoSom) return;

    this.somAtivo = !this.somAtivo;

    if (this.somAtivo) {
      this.musica.play();
      this.botaoSom.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    } else {
      this.musica.pause();
      this.botaoSom.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
  }

  // Listener para cliques fora do menu
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.menuConfig || !this.btnConfig) return;

    const target = event.target as HTMLElement;
    
    if (!this.menuConfig.contains(target) && target !== this.btnConfig) {
      this.menuConfig.style.display = "none";
    }
  }
}