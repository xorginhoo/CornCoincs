import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-esqueci-senha',
  template: `
    <div class="forgot-password-container">
      <div class="form-area" #formArea>
        <!-- Conteúdo carregado dinamicamente -->
      </div>
    </div>
  `,
  styles: [`
    .forgot-password-container {
      padding: 20px;
      max-width: 400px;
      margin: 0 auto;
    }

    .form-area {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #FF2D2D;
      margin-bottom: 10px;
      text-align: center;
    }

    p {
      color: #666;
      text-align: center;
      margin-bottom: 20px;
    }

    input {
      width: 100%;
      padding: 12px;
      margin: 8px 0;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.3s;
    }

    input:focus {
      border-color: #FF2D2D;
      outline: none;
      box-shadow: 0 0 5px rgba(255, 45, 45, 0.3);
    }

    button {
      width: 100%;
      padding: 12px;
      background: #FF2D2D;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 10px;
      transition: background 0.3s;
    }

    button:hover {
      background: #E52525;
    }

    .codigo-box {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin: 20px 0;
    }

    .codigo-box input {
      width: 50px;
      height: 50px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
    }
  `]
})
export class EsqueciSenhaComponent implements OnInit, AfterViewInit {

  @ViewChild('formArea') formAreaRef!: ElementRef;
  private currentEmail: string = '';

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadStep1();
  }

  // -----------------------------------------------------
  // ETAPA 1 – digita o e-mail
  // -----------------------------------------------------
  private loadStep1(): void {
    const area = this.formAreaRef.nativeElement;

    area.innerHTML = `
      <h2>Esqueceu a senha?</h2>
      <p>Digite seu e-mail para enviarmos um código.</p>

      <form id="step1Form">
        <input type="email" placeholder="Digite seu e-mail" id="email" required>
        <button type="submit">Enviar código</button>
      </form>
    `;

    const form = area.querySelector('#step1Form') as HTMLFormElement;

    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const emailInput = area.querySelector('#email') as HTMLInputElement;
      this.currentEmail = emailInput.value;
      this.loadStep2();
    });
  }

  // -----------------------------------------------------
  // ETAPA 2 – insere os dígitos
  // -----------------------------------------------------
  private loadStep2(): void {
    const area = this.formAreaRef.nativeElement;

    area.innerHTML = `
      <h2>Código de verificação</h2>
      <p>Insira o código enviado para: <strong>${this.currentEmail}</strong></p>

      <div class="codigo-box">
        <input type="text" maxlength="1" class="code-input">
        <input type="text" maxlength="1" class="code-input">
        <input type="text" maxlength="1" class="code-input">
        <input type="text" maxlength="1" class="code-input">
      </div>

      <button type="button" id="verifyCodeBtn">Verificar</button>
    `;

    this.setupCodeInputs();

    const verifyBtn = area.querySelector('#verifyCodeBtn') as HTMLButtonElement;

    verifyBtn.addEventListener('click', () => {
      this.loadStep3();
    });
  }

  // Inputs com foco automático
  private setupCodeInputs(): void {
    const area = this.formAreaRef.nativeElement;
    const inputs = area.querySelectorAll('.code-input') as NodeListOf<HTMLInputElement>;

    inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      input.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Backspace' && input.value === '' && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });

    inputs[0].focus();
  }

  // -----------------------------------------------------
  // ETAPA 3 – criar nova senha
  // -----------------------------------------------------
  private loadStep3(): void {
    const area = this.formAreaRef.nativeElement;

    area.innerHTML = `
      <h2>Redefinir senha</h2>
      <p>Crie uma nova senha para sua conta</p>

      <form id="step3Form">
        <input type="password" placeholder="Nova senha" id="newPassword" required>
        <input type="password" placeholder="Confirmar senha" id="confirmPassword" required>
        <button type="submit">Confirmar</button>
      </form>
    `;

    const form = area.querySelector('#step3Form') as HTMLFormElement;

    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.handlePasswordReset();
    });
  }

  private handlePasswordReset(): void {
    const area = this.formAreaRef.nativeElement;
    const newPassword = area.querySelector('#newPassword') as HTMLInputElement;
    const confirmPassword = area.querySelector('#confirmPassword') as HTMLInputElement;

    if (newPassword.value !== confirmPassword.value) {
      alert('As senhas não coincidem!');
      return;
    }

    if (newPassword.value.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    alert('Senha redefinida com sucesso!');
  }
}
