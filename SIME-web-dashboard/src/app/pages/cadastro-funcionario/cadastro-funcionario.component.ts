import { Component } from '@angular/core';
import { EscolaService } from '../../services/escola/escola.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { usuarioRequestDTO } from '../../DTOs/usuarioRequestDTO';
import { TipoPerfilResponseDTO } from '../../DTOs/TipoPerfilResponseDTO';
import { PublicService } from '../../services/public-routes/public.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-funcionario',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './cadastro-funcionario.component.html',
  styleUrl: './cadastro-funcionario.component.css'
})
export class CadastroFuncionarioComponent {
  formCadastrarUsuario!: FormGroup;
  constructor(
    private escolaService: EscolaService,
     private fb: FormBuilder,
     private authService: AuthService,
     private publicService: PublicService,
     private router: Router
    ){
    this.formCadastrarUsuario = this.fb.group({
      tipoPerfil: [this.tiposPerfil[1] || null],
      rmUsuario: ['', Validators.required],
      nomeUsuario: ['', Validators.required],
      senhaUsuario: ['', Validators.required],
      cpfUsuario: ['', Validators.required],
      emailUsuario: ['', Validators.required]
    });
  }
  tiposPerfil: TipoPerfilResponseDTO[] = [];
   showPassword = false;


ngOnInit() {
    this.loadSelectTipoPerfil();
  }


  onCadastrarUsuario(){
    const formValue = this.formCadastrarUsuario.value;

    const novoUsuario: usuarioRequestDTO = {
      rmUsuario: String(formValue.rmUsuario),
      nomeUsuario: String(formValue.nomeUsuario),
      senhaUsuario: String(formValue.senhaUsuario),
      emailUsuario: String(formValue.emailUsuario),
      cpfUsuario: String(formValue.cpfUsuario),
      telefoneUsuario: String(formValue.cpfUsuario)
    };

    this.escolaService.cadastrarUsuario(novoUsuario).subscribe({
      next: (resp) => {
        alert("Usuario criado com sucesso!");
        this.formCadastrarUsuario.reset();
      },error: (err) => {
        alert("Erro ao criar Usuario!!");
        console.log(err)
      }
    })
  }

    loadSelectTipoPerfil() {
    this.publicService.getTipoPerfilNomes().subscribe({
      next: (tiposPerfil) => {
        const tipoPadrao: TipoPerfilResponseDTO = { idTipoPerfil: 1, nomeTipoPerfil: 'Gestor Departamento' };

        this.tiposPerfil = tiposPerfil.some(t => t.idTipoPerfil === tipoPadrao.idTipoPerfil)
          ? tiposPerfil
          : [tipoPadrao, ...tiposPerfil];

        this.formCadastrarUsuario.get('tipoPerfil')?.setValue(this.tiposPerfil[1]);
      },
      error: (err) => console.error('Erro ao buscar tipos de perfil: ', err),
    });
  }

  navCancelar(){
    this.router.navigate(['/layout/criar']);
  }

}
