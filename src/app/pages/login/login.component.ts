import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.configurarAbas();
    this.configurarToggleSenha();
    this.configurarValidacaoCadastro();
  }

  // =========================
  // 1. Alternância LOGIN / CADASTRO
  // =========================
  private configurarAbas() {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (!loginTab || !registerTab || !loginForm || !registerForm) return;

    loginTab.addEventListener('click', () => {
      loginForm.classList.add('active');
      loginTab.classList.add('active');
      registerForm.classList.remove('active');
      registerTab.classList.remove('active');
    });

    registerTab.addEventListener('click', () => {
      loginForm.classList.remove('active');
      loginTab.classList.remove('active');
      registerForm.classList.add('active');
      registerTab.classList.add('active');
    });

    // Evento de SUBMIT do login
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = (loginForm.querySelector('input[type="email"]') as HTMLInputElement)?.value;
      const senha = (loginForm.querySelector('input[type="password"]') as HTMLInputElement)?.value;

      // Admin
      if (email === "a@gmail.com" && senha === "123456") {
        this.router.navigate(['/menu']);
        return;
      }

      // Login normal
      this.loginComum(email, senha);
    });
  }

  // =========================
  // 2. Mostrar / Esconder SENHA
  // =========================
  private configurarToggleSenha() {
    document.querySelectorAll('.toggle-password').forEach(icon => {
      icon.addEventListener('click', () => {
        const parent = (icon as HTMLElement).parentElement;
        if (!parent) return;

        const input = parent.querySelector('.password-field') as HTMLInputElement;
        if (!input) return;

        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';

        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      });
    });
  }

  // =========================
  // 3. Validação do Cadastro (Termos obrigatórios)
  // =========================
  private configurarValidacaoCadastro() {
    const registerForm = document.getElementById('register-form');
    if (!registerForm) return;

    registerForm.addEventListener('submit', (e) => {
      const termos = document.getElementById('terms') as HTMLInputElement;
      if (!termos?.checked) {
        e.preventDefault();
        alert('Você precisa aceitar os termos para continuar.');
      }
    });
  }

  // =========================
  // 4. Lógica de LOGIN normal
  // =========================
  private loginComum(email: string, senha: string) {
    console.log('Login comum:', email, senha);
    // Coloque aqui Firebase, API etc.
  }
}
