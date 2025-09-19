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

  login() {
    if (this.loginForm.invalid) return;

    const loginDTO = {
      rmUsuario: this.loginForm.value.usuario,
      idTipoPerfil: this.loginForm.value.perfil === 'gestor' ? 1 : 2,
      senhaUsuario: this.loginForm.value.senha,
      codEscola: this.loginForm.value.codigoEtec,
    };

    this.authService.login(loginDTO).subscribe({
      next: (token) => console.log('Token recebido: ', token),
      error: (err) => console.error('Erro ao fazer login: ', err),
    });
  }

  getAllUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarios) => console.log('Usuários recebidos: ', usuarios),
      error: (err) => console.error('Erro ao buscar usuários: ', err),
    });
  }
}
