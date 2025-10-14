import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { EscolaService } from '../../services/escola/escola.service';
import { tipoEquipamento } from '../../models/tipoEquipamento';
import { Router, RouterModule } from '@angular/router';
import { tipoAmbiente } from '../../models/tipoAmbiente';
import { ambienteRequestDTO } from '../../DTOs/ambienteRequestDTO';
import { NgForOf } from "../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";

@Component({
  selector: 'app-criar-ambiente',
  imports: [ReactiveFormsModule, RouterModule, NgForOf],
  templateUrl: './criar-ambiente.component.html',
  styleUrl: './criar-ambiente.component.css'
})
export class CriarAmbienteComponent {

  ambienteForm: FormGroup;
  tipoAmbienteForm: FormGroup;

  tiposEquipamento: tipoEquipamento[] = [];
  tiposAmbiente: tipoAmbiente[] = [];
  ambientes: ambienteRequestDTO[] = [];
  qtdAmbientes: number[] = [];

  criarLocal: boolean = true;
  idTipoAmbiente: number = 0;
  nomeTipoAmbiente: string = "CRIAR AMBIENTE";

  constructor(private fb: FormBuilder, private escolaService: EscolaService, private router: Router){
    this.ambienteForm = this.fb.group({
      nomeLocal: ['', Validators.required],
      numeroLocal: [ , Validators.required],
      tipoEquipamento: ['', Validators.required]
    }),
    this.tipoAmbienteForm = this.fb.group({
      nomeTipoLocal: ['', Validators.required]
    })
  }

  ngOnInit(): void{
    this.getElementos();
    this.contagemAmbiente();
  }

  getElementos(): void{

    this.escolaService.getAllTipoEquipamento().subscribe((resp) => {this.tiposEquipamento = resp});

    this.escolaService.getAllTipoAmbiente().subscribe((resp) => {this.tiposAmbiente = resp});

    this.escolaService.getAllAmbiente().subscribe((resp) => {this.ambientes = resp});
  }

  contagemAmbiente(){
    for(let i = 0; i < this.tiposAmbiente.length; i++){
      let qtd = 0;
      for(let j = 0; j < this.ambientes.length; j++){
        if(this.ambientes[j].idTipoAmbiente == this.tiposAmbiente[i].idTipoAmbiente){
          qtd = qtd + 1;
        }
      }
      this.qtdAmbientes.push(qtd)
    }

    console.log(this.qtdAmbientes);
  }

  btnCriar(){
    this.criarLocal =! this.criarLocal;
    console.log(this.criarLocal);
  }

  mandarIdNomeTipoAmbiente(id: number, nome: string){
    this.idTipoAmbiente = id;
    this.nomeTipoAmbiente = nome.toUpperCase();
  }

  onCriar(){
    if(this.criarLocal){
      this.criarAmbiente();
    }
    else{
      this.criarTipoAmbiente();
    }
  }

  criarAmbiente(){

    if(this.idTipoAmbiente > 0){

      const ambienteRequestDTO = {
        numAmbiente: this.ambienteForm.value.numeroLocal,
        descricaoAmbiente: this.ambienteForm.value.nomeLocal,
        idTipoAmbiente: this.idTipoAmbiente
      }

      if(ambienteRequestDTO.numAmbiente != null && ambienteRequestDTO.descricaoAmbiente != ""){
        this.escolaService.cadastrarAmbiente(ambienteRequestDTO).subscribe({
          next: () => {
            alert("Ambiente criado com sucesso!")
          },
          error: () => {
            alert("Erro, ambiente não criado!")
          }
        });
      }else{
        alert("Preencha todos os campos obrigatórios!")
      }
    }else{
      alert("Selecione um tipo de ambiente!");
    }

  }

  criarTipoAmbiente(){
    const tipoAmbienteRequestDTO = {
      nomeTipoAmbiente: this.tipoAmbienteForm.value.nomeTipoLocal
    }

    this.escolaService.criarTipoAmbiente(tipoAmbienteRequestDTO).subscribe({
        next: () => {
          alert("Tipo ambiente criado com sucesso!")
          window.location.reload();
        },
        error: () => {
          alert("Erro, tipo ambiente não criado!")
        }
      });
  }

  onCancelar(){
    this.router.navigate(['/layout/criar']);
  }

}
