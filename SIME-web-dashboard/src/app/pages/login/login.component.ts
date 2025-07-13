import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private usuarioService: UsuarioService) {}

  login() {
    const loginDTO = {
      rmUsuario: '123456',
      idTipoPerfil: 1,
      senhaUsuario: 'admin123',
      codEscola: 'E01',
    }

    this.usuarioService.login(loginDTO).subscribe({
      next: (token) => console.log('Token recebido: ', token),
      error: (err) => console.error('Erro ao fazer login: ', err),
    })
  }

  getAllUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarios) => console.log('Usuários recebidos: ', usuarios),
      error: (err) => console.error('Erro ao buscar usuários: ', err),
    });
  }
}

