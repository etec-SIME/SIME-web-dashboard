import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { TipoPerfilResponseDTO } from '../../DTOs/TipoPerfilResponseDTO';
import { PublicService } from '../../services/public-routes/public.service';

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
  tiposPerfil: TipoPerfilResponseDTO[] = [];

  camposAtuais: { nome: string; tipo: string } [] = [];

  constructor(
    private authService: AuthService,
    private publicService: PublicService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      tipoPerfil: [this.tiposPerfil[0] || null],
      codigoEtec: ['', Validators.required],
      senha: ['', Validators.required],
    });
    
    this.onPerfilChange();
  }

  ngOnInit() {
    this.loadSelectTipoPerfil();
  }

  loadSelectTipoPerfil() {
    this.publicService.getTipoPerfilNomes().subscribe({
      next: (tiposPerfil) => {
        this.tiposPerfil = tiposPerfil;
        this.loginForm.get('tipoPerfil')?.setValue(this.tiposPerfil[0]);
        this.onPerfilChange();
      },
      error: (err) => console.error('Erro ao buscar tipos de perfil: ', err),
    });
  }

  onPerfilChange() {
    const tipoPerfil = this.loginForm.get('tipoPerfil')?.value;
  
    Object.keys(this.loginForm.controls).forEach(c => {
      if (!['tipoPerfil','senha','codigoEtec'].includes(c)) {
        this.loginForm.removeControl(c);
      }
    });
  
    this.camposAtuais = [];
  
    if (tipoPerfil?.nomeTipoPerfil === 'Escola') {
      this.camposAtuais.push({ nome: 'cnpj', tipo: 'text' });
      if (!this.loginForm.get('cnpj')) {
        this.loginForm.addControl('cnpj', this.fb.control(''));
      }
    } else {
      this.camposAtuais.push({ nome: 'rm', tipo: 'text' });
      if (!this.loginForm.get('rm')) {
        this.loginForm.addControl('rm', this.fb.control(''));
      }
    }
  }

  login() {
    const tipoPerfil = this.loginForm.get('tipoPerfil')?.value;

    if (tipoPerfil === 'Escola') {
      this.loginEscola();
    } else {
      this.loginUsuario();
    }
  }

  loginUsuario() {
    const formValues = this.loginForm.value;

    const tipoPerfilObj = formValues.tipoPerfil;

    const LoginDTO = {
      rmUsuario: this.loginForm.value.rm,
      idTipoPerfil: tipoPerfilObj.idTipoPerfil,
      senhaUsuario: this.loginForm.value.senha,
      codEscola: this.loginForm.value.codigoEtec,
    };

    this.authService.loginUsuario(LoginDTO).subscribe({
      next: (token) => console.log('Token do Usuário recebido: ', token),
      error: (err) => console.error('Erro ao fazer login com Usuário: ', err),
    })
  }

  loginEscola() {
    const loginEscolaDTO = {
      codEscola: this.loginForm.value.codigoEtec,
      cnpjEscola: this.loginForm.value.cnpj,
      senhaEscola: this.loginForm.value.senha,
    }

    this.authService.loginEscola(loginEscolaDTO).subscribe({
      next: (token) => console.log('Token da Escola recebido: ', token),
      error: (err) => console.log('Erro ao fazer login com Escola: ', err)
    })
  }

  // getAllUsuarios() {
  //   this.usuarioService.getAllUsuarios().subscribe({
  //     next: (usuarios) => console.log('Usuários recebidos: ', usuarios),
  //     error: (err) => console.error('Erro ao buscar usuários: ', err),
  //   });
  // }
}
