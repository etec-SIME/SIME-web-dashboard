import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { chamadoProjection } from '../../DTOs/Projections/chamadoProjection';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { QuadroChamadosComponent } from '../../components/quadro-chamados/quadro-chamados.component';

@Component({
  selector: 'app-chamados-concluidos',
  imports: [RouterModule, QuadroChamadosComponent],
  templateUrl: './chamados-concluidos.component.html',
  styleUrl: './chamados-concluidos.component.css'
})
export class ChamadosConcluidosComponent {

  chamadosAlta = [
    { data: '06/05/25', descricao: 'Computador quebrado', local: 'Lab. 2' }
  ];

  chamadosMedia = [
    { data: '00/00/00', descricao: 'Nome', local: 'Local' }
  ];

  chamadosBaixa = [
    { data: '00/00/00', descricao: 'Nome', local: 'Local' }
  ];

  // chamadosConcluidos: chamadoProjection[] = [];

  // constructor(private funcionarioService: FuncionarioService) {}

  // ngOnInit(): void {
  //   this.funcionarioService.getAllChamadosConcluidos().subscribe((resp) => {
  //     console.log('Chamados concluidos:', resp);
  //     this.chamadosConcluidos = resp;
  //   });
  // }
  
}
