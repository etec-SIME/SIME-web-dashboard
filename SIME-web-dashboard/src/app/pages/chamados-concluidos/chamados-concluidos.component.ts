import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChamadoService } from '../../services/chamado/chamado.service';
import { chamadoProjection } from '../../DTOs/Projections/chamadoProjection';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';

@Component({
  selector: 'app-chamados-concluidos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './chamados-concluidos.component.html',
  styleUrl: './chamados-concluidos.component.css'
})
export class ChamadosConcluidosComponent implements OnInit{

  chamadosConcluidos: chamadoProjection[] = [];

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.funcionarioService.getAllChamadosConcluidos().subscribe((resp) => {
      console.log('Chamados concluidos:', resp);
      this.chamadosConcluidos = resp;
    });
  }
  
}
