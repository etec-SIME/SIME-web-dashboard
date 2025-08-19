import { Component, OnInit } from '@angular/core';
import { EscolaService } from '../../services/escola/escola.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { escolaProjection } from '../../DTOs/Projections/escolaProjection';
import { ambiente } from '../../models/ambiente';
import { departamento } from '../../models/departamento';
import { ambienteRequestDTO } from '../../DTOs/ambienteRequestDTO';
import { departamentoRequestDTO } from '../../DTOs/departamentoRequestDTO';
import { tipoPerfil } from '../../models/tipoPerfil';
import { tipoPerfilRequestDTO } from '../../DTOs/tipoPerfilRequestDTO';
import { tipoChamadoRequestDTO } from '../../DTOs/tipoChamadoRequestDTO';
import { equipamentoRequestDTO } from '../../DTOs/equipamentoRequestDTO';
import { permissao } from '../../models/permissao';
import { tipoEquipamento } from '../../models/tipoEquipamento';

@Component({
  selector: 'app-escola',
  imports: [CommonModule, RouterModule],
  templateUrl: './escola.component.html',
  styleUrl: './escola.component.css'
})
export class EscolaComponent implements OnInit{

  ambientes: ambienteRequestDTO[] = []
  departamentos: departamentoRequestDTO[] = []
  escolas: escolaProjection[] = []
  tipoPerfis: tipoPerfilRequestDTO[] = []
  tipoChamados: tipoChamadoRequestDTO[] = []
  equipamentos: equipamentoRequestDTO[] = []
  permissoes: permissao[] = []
  tipoEquipamentos: tipoEquipamento[] = []


  constructor(private escolaService: EscolaService){}
  carregado: boolean = false;

  ngOnInit(): void{
    this.escolaService.getAllEscolas().subscribe((resp) => {
      //console.log('Escolas: ', resp);
      this.escolas = resp,
      this.carregado = true
    })
      this.escolaService.getAllAmbiente().subscribe((resp) => {
        this.ambientes = resp,
        this.carregado = true
      })

      this.escolaService.getAllDepartamento().subscribe((resp) => {
        this.departamentos = resp,
        this.carregado = true
  })

  this.escolaService.getAllTipoPerfil().subscribe((resp) => {
    this.tipoPerfis = resp
    this.carregado = true
  })

  this.escolaService.getAllEquipamento().subscribe((resp) => {
    this.equipamentos = resp
    this.carregado = true
  })

  //this.escolaService.getAllPermissaoTipoPerfil(id tipo perfil).subscribe((resp) =>{
   // this.permissoes = resp
  //})

  this.escolaService.getAllTipoChamado().subscribe((resp) => {
    this.tipoChamados = resp
    this.carregado = true
  })

  //this.escolaService.getAllTipoEquipamentoAmbiente(id ambiente)

  
  }
}
