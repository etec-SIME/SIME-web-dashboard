import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { EscolaService } from '../../services/escola/escola.service';
import { tipoEquipamento } from '../../models/tipoEquipamento';
import { Router, RouterModule } from '@angular/router';
import { tipoAmbiente } from '../../models/tipoAmbiente';
import { forkJoin} from 'rxjs';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';
import { codEquipamentoResponseDTO, equipamentoEnvioRequestDTO } from '../../DTOs/codEquipamentoResponseDTO';
import { sharedImports } from '../../shared/shared-imports';

@Component({
  selector: 'app-criar-ambiente',
  imports: [ReactiveFormsModule, RouterModule, sharedImports],
  templateUrl: './criar-ambiente.component.html',
  styleUrl: './criar-ambiente.component.css'
})
export class CriarAmbienteComponent {

  ambienteForm: FormGroup;
  tipoAmbienteForm: FormGroup;

  tiposEquipamento: tipoEquipamento[] = [];
  tiposAmbiente: tipoAmbiente[] = [];
  ambientes: AmbienteSelectDTO[] = [];
  qtdAmbientes: number[] = [];
  codsEquipamentos: codEquipamentoResponseDTO[] = []
  listarCods: codEquipamentoResponseDTO[] = []
  equipamentosParaEnvio: equipamentoEnvioRequestDTO[] = []
  

  criarLocal: boolean = true;
  modalCodigos: boolean = false;

  idTipoAmbiente: number = 0;
  nomeTipoAmbiente: string = "CRIAR AMBIENTE";
  nomeListagemEquipamentos: string = "Todos equipamentos"

  constructor(private fb: FormBuilder, private escolaService: EscolaService, private router: Router){
    this.ambienteForm = this.fb.group({
      numeroLocal: [ , Validators.required],
      descricaoLocal: ['', Validators.required]
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
    forkJoin({
        tiposEquipamento: this.escolaService.getAllTipoEquipamento(),
        tiposAmbiente: this.escolaService.getAllTipoAmbiente(),
        ambientes: this.escolaService.getAllAmbiente(),
        codsEquipamentos: this.escolaService.getAllEquipamentosSemAmbiente()
    }).subscribe(
          (data) => {
            this.tiposEquipamento = data.tiposEquipamento;
            this.tiposAmbiente = data.tiposAmbiente;
            this.ambientes = data.ambientes;
            this.codsEquipamentos = data.codsEquipamentos;

            for(let i = 0; i < this.codsEquipamentos.length; i++){
              this.listarCods.push(this.codsEquipamentos[i])
            }

            this.contagemAmbiente();
        },
        (error) => {
            console.error('Erro ao carregar dados:', error);
        }
      );

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
  }

  mostrarModal(){
    this.modalCodigos = !this.modalCodigos;
    this.listarCodigosTipoEquipamento(0);
  }

  listarCodigosTipoEquipamento(id: number){
    this.listarCods.splice(0, this.listarCods.length);

    if(id >= 1){
      
      this.listarCods = this.codsEquipamentos.filter(equip => equip.idTipoEquipamento === id);

      for(let j = 0; j < this.tiposEquipamento.length; j++){
        if(this.tiposEquipamento[j].idTipoEquipamento == id){
          this.nomeListagemEquipamentos = this.tiposEquipamento[j].nomeTipoEquipamento;
        }
      }
    }else{
        for(let i = 0; i < this.codsEquipamentos.length; i++){
          this.listarCods.push(this.codsEquipamentos[i]);
        }
        this.nomeListagemEquipamentos = "Todos equipamentos";
    } 
  }

  desmarcarEquipamento(equipamento: codEquipamentoResponseDTO){
    equipamento.selecionado = !equipamento.selecionado;
  }

  getEquipamentosSelecionados(){
    const equipamentosSelecionados = this.codsEquipamentos.filter(equip => equip.selecionado);

    const equipamentoOrganizados = equipamentosSelecionados.map(({ codEquipamento, idTipoEquipamento }) => ({
      codEquipamento, 
      idTipoEquipamento 
    }));

    this.equipamentosParaEnvio = equipamentoOrganizados;
    
    this.mostrarModal();
  }

  btnCriar(){
    this.criarLocal = !this.criarLocal;
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
        descricaoAmbiente: this.ambienteForm.value.descricaoLocal,
        idTipoAmbiente: this.idTipoAmbiente,
        equipamentoList: this.equipamentosParaEnvio
      }

      if(ambienteRequestDTO.numAmbiente != null && ambienteRequestDTO.descricaoAmbiente != ""){
        if(ambienteRequestDTO.equipamentoList.length > 0){
          this.escolaService.cadastrarAmbiente(ambienteRequestDTO).subscribe({
            next: () => {
              alert("Ambiente criado com sucesso!");
              window.location.reload();
            },
            error: () => {
              alert("Erro, ambiente não criado!");
            }
          });
        }else{
          alert("Selecione os códigos dos equipamentos!");
        }
      }else{
        alert("Preencha todos os campos obrigatórios!");
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