import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private usuarioService: UsuarioService) {}

  loginUsuario() {
    const loginDTO = {
      rmUsuario: '123456',
      idTipoPerfil: 1,
      senhaUsuario: 'admin123',
      codEscola: 'E01',
    }

    this.authService.loginUsuario(loginDTO).subscribe({
      next: (token) => console.log('Token do Usuário recebido: ', token),
      error: (err) => console.error('Erro ao fazer login com Usuário: ', err),
    })
  }

  loginEscola() {
    const loginEscolaDTO = {
      codEscola: 'E01',
      cnpjEscola: '12345678000195',
      senhaEscola: 'senha123'
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

