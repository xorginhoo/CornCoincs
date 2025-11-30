import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink], // ← agora routerLink funciona no HTML
  templateUrl: './esqueceusenha.component.html',
  styleUrls: ['./esqueceusenha.component.css']
})
export class EsqueciSenhaComponent {

  step: number = 1;

  email: string = "";
  code: string[] = ["", "", "", ""];
  newPassword: string = "";
  confirmPassword: string = "";

  // Etapa 1
  sendCode() {
    if (!this.email) return;
    this.step = 2;
  }

  // Etapa 2
  verifyCode() {
    if (this.code.join('').length === 4) {
      this.step = 3;
    }
  }

  // Etapa 3
  resetPassword() {
    if (this.newPassword === this.confirmPassword) {
      alert("Senha redefinida com sucesso!");
    } else {
      alert("As senhas não coincidem!");
    }
  }
}
