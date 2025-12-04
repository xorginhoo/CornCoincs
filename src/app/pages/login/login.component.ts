import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {


  constructor(private router: Router, private auth: Auth) {}

  ngAfterViewInit(): void {
    this.configurarAbas();
    this.configurarToggleSenha();
    this.configurarValidacaoCadastro();
  }

  // Alternância entre Login e Cadastro
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

    // SUBMIT Login
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = (loginForm.querySelector('input[type="email"]') as HTMLInputElement)?.value;
      const senha = (loginForm.querySelector('input[type="password"]') as HTMLInputElement)?.value;

      // Admin
      if (email === "a@gmail.com" && senha === "123456") {
        this.router.navigate(['/menu']);
        return;
      }

      this.loginComLocalStorage(email, senha);
    });

    // SUBMIT Cadastro (salva no LocalStorage)
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.salvarCadastroNoLocalStorage();
    });
  }

  // Mostrar / esconder senha
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

  // Validação do checkbox de termos
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

  // ***************************
  // 🔹 CADASTRO COM LOCALSTORAGE
  // ***************************
  private salvarCadastroNoLocalStorage() {
    const registerForm = document.getElementById('register-form') as HTMLFormElement;
    const email = (registerForm.querySelector('input[type="email"]') as HTMLInputElement)?.value;
    const senha = (registerForm.querySelectorAll('.password-field')[0] as HTMLInputElement)?.value;
    const confirmSenha = (registerForm.querySelectorAll('.password-field')[1] as HTMLInputElement)?.value;

    if (senha !== confirmSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    localStorage.setItem('usuarioEmail', email);
    localStorage.setItem('usuarioSenha', senha);

    alert("Cadastro realizado com sucesso! Faça login agora 👍");

    // Mudar para a aba de login automaticamente
    document.getElementById('login-tab')?.click();
  }

  // *************************
  // 🔹 LOGIN COM LOCALSTORAGE
  // *************************
  private loginComLocalStorage(email: string, senha: string) {
    const emailSalvo = localStorage.getItem('usuarioEmail');
    const senhaSalva = localStorage.getItem('usuarioSenha');

    if (email === emailSalvo && senha === senhaSalva) {
      this.router.navigate(['/menu']);
    } else {
      alert("Email ou senha incorretos!");
    }
  }

  loginGoogle() {
    const provider = new GoogleAuthProvider();
  
    signInWithPopup(this.auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Logado como:", user.email);
  
        // Redirecionar após login
        this.router.navigate(['/menu']);
      })
      .catch((error) => {
        console.error("Erro ao logar com Google:", error);
        alert("Falha ao realizar login com Google");
      });
  }
  
}
