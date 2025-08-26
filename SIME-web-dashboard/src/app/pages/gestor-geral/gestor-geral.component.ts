import { PrioridadeChamadoEnum } from './../../models/enums/prioridade-chamado-enum';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GestorGeralService } from '../../services/gestor-geral/gestor-geral.service';
import { chamadoProjection } from '../../DTOs/Projections/chamadoProjection';

@Component({
  selector: 'app-gestor-geral',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestor-geral.component.html',
  styleUrls: ['./gestor-geral.component.css']
})
export class GestorGeralComponent implements OnInit{

  PrioridadeChamadoEnum = PrioridadeChamadoEnum;

  chamados: chamadoProjection[] = [];

  prioridades: PrioridadeChamadoEnum[] = [
    PrioridadeChamadoEnum.BaixaPrioridade,
    PrioridadeChamadoEnum.MediaPrioridade,
    PrioridadeChamadoEnum.AltaPrioridade
  ];

  carregado: boolean = false;
  exibe: boolean = false;

  constructor(private gestorGeralService: GestorGeralService){}

  ngOnInit(): void {
    this.gestorGeralService.getAllChamados().subscribe((resp) => {
      this.chamados = resp,
      this.carregado = true;
    });
  }

  exibeBtnsPrioridade(){
    this.exibe = !this.exibe;
  }

  editarPrioridade(rmGestor: string, idChamado: number, novaPrioidade: PrioridadeChamadoEnum){
    this.gestorGeralService.definirPrioridadeChamado(rmGestor, idChamado, novaPrioidade).subscribe();
    location.reload();
  }

  aceitarChamado(rmGestor: string, idChamado: number){
    this.gestorGeralService.aceitarChamado(rmGestor, idChamado).subscribe();
    location.reload();
  }

  recusarChamado(rmGestor: string, idChamado:number, msgRecusa: string){
    this.gestorGeralService.recusarChamado(rmGestor, idChamado, msgRecusa).subscribe();
    alert("Mensagem de recusa: " + msgRecusa);
    location.reload();
  }

}
