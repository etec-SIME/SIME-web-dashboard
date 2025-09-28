import { Component } from '@angular/core';
import { EscolaService } from '../../services/escola/escola.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { usuarioRequestDTO } from '../../DTOs/usuarioRequestDTO';

@Component({
  selector: 'app-cadastro-funcionario',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-funcionario.component.html',
  styleUrl: './cadastro-funcionario.component.css'
})
export class CadastroFuncionarioComponent {
  formCadastrarUsuario!: FormGroup;
  constructor(private escolaService: EscolaService, private fb: FormBuilder){
    this.cadastrarUsuario();
  }

  cadastrarUsuario(){
    this.formCadastrarUsuario =  this.fb.group({
      rmUsuario: ['', Validators.required],
      nomeUsuario: [''],
      senhaUsuario: [''],
      cpfUsuario: [''],
      emailUsuario: [''],
      telefoneUsuario: [''],
  })
  }

  onCadastrarUsuario(){
    const formValue = this.formCadastrarUsuario.value;

    const novoUsuario: usuarioRequestDTO = {
      rmUsuario: String(formValue.rmUsuario),
      nomeUsuario: String(formValue.nomeUsuario),
      senhaUsuario: String(formValue.senhaUsuario),
      emailUsuario: String(formValue.emailUsuario),
      cpfUsuario: String(formValue.cpfUsuario),
      telefoneUsuario: String(formValue.telefoneUsuario),
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


}
