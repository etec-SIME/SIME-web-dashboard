import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      perfil: ['', Validators.required],
      codigoEtec: ['', Validators.required],
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  loginUsuario() {
    const loginDTO = {
      rmUsuario: this.loginForm.value.usuario,
      idTipoPerfil: this.loginForm.value.perfil === 'gestor' ? 1 : 2,
      senhaUsuario: this.loginForm.value.senha,
      codEscola: this.loginForm.value.codigoEtec,
    };

    this.authService.loginUsuario(loginDTO).subscribe({
      next: (token) => console.log('Token do Usuário recebido: ', token),
      error: (err) => console.error('Erro ao fazer login com Usuário: ', err),
    })
  }

  loginEscola() {
    const loginEscolaDTO = {
      codEscola: 'E01',
      cnpjEscola: '12345678000100',
      senhaEscola: '123'
    }

    this.authService.loginEscola(loginEscolaDTO).subscribe({
      next: (token) => console.log('Token da Escola recebido: ', token),
      error: (err) => console.log('Erro ao fazer login com Escola: ', err)
    })
  }

  getAllUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarios) => console.log('Usuários recebidos: ', usuarios),
      error: (err) => console.error('Erro ao buscar usuários: ', err),
    });
  }
}
