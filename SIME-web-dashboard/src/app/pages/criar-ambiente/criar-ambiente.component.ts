import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { EscolaService } from '../../services/escola/escola.service';
import { tipoEquipamento } from '../../models/tipoEquipamento';
import { Router, RouterModule } from '@angular/router';
import { tipoAmbiente } from '../../models/tipoAmbiente';
import { ambienteRequestDTO } from '../../DTOs/ambienteRequestDTO';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-criar-ambiente',
  imports: [ReactiveFormsModule, RouterModule],
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
    this.getElementos().subscribe(
        (data) => {
            // 1. Atribua os resultados APENAS quando todos chegarem
            this.tiposEquipamento = data.tiposEquipamento;
            this.tiposAmbiente = data.tiposAmbiente;
            this.ambientes = data.ambientes;

            // 2. Agora os arrays estão preenchidos, então a contagem funciona!
            this.contagemAmbiente();
        },
        (error) => {
            console.error('Erro ao carregar dados:', error);
        }
    );

    this.contagemAmbiente();
  }

  getElementos(): Observable<any>{
    
    return forkJoin({
        tiposEquipamento: this.escolaService.getAllTipoEquipamento(),
        tiposAmbiente: this.escolaService.getAllTipoAmbiente(),
        ambientes: this.escolaService.getAllAmbiente()
    });

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
            window.location.reload();
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
