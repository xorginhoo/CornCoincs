import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';  // ★ IMPORT NECESSÁRIO

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],  // ★ AGORA FUNCIONA
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private musica!: HTMLAudioElement;
  private botaoSom!: HTMLElement;
  private btnConfig!: HTMLElement;
  private menuConfig!: HTMLElement;
  private logoutBtn!: HTMLElement;

  somAtivo: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.musica = document.getElementById("musicaFundo") as HTMLAudioElement;
    this.botaoSom = document.getElementById("botaoSom") as HTMLElement;
    this.btnConfig = document.getElementById("configuracao") as HTMLElement;
    this.menuConfig = document.getElementById("menuConfig") as HTMLElement;
    this.logoutBtn = document.getElementById("logoutBtn") as HTMLElement;

    this.inicializarEventos();
    this.inicializarSom();
  }

  private inicializarEventos(): void {
    this.btnConfig?.addEventListener("click", () => {
      const visivel = this.menuConfig.style.display === "flex";
      this.menuConfig.style.display = visivel ? "none" : "flex";
    });

    this.logoutBtn?.addEventListener("click", () => {
      alert("Você saiu da conta!");
      this.router.navigate(['/']);
    });

    this.botaoSom?.addEventListener("click", () => {
      this.toggleSom();
    });
  }

  private inicializarSom(): void {
    if (!this.musica) return;

    this.botaoSom.innerHTML = '<i class="fa-solid fa-volume-high"></i>';

    this.musica.play().catch(() => {
      console.log("Autoplay bloqueado — som iniciará como mudo");
      this.somAtivo = false;
      this.botaoSom.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    });
  }

  private toggleSom(): void {
    this.somAtivo = !this.somAtivo;

    if (this.somAtivo) {
      this.musica.play();
      this.botaoSom.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    } else {
      this.musica.pause();
      this.botaoSom.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
  }

  @HostListener('document:click', ['$event'])
  fecharMenuFora(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!this.menuConfig || !this.btnConfig) return;

    const clicouFora =
      !this.menuConfig.contains(target) &&
      !this.btnConfig.contains(target);


    if (clicouFora) {
      this.menuConfig.style.display = "none";
    }
  }
}
