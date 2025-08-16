import { Component, OnInit } from '@angular/core';
import { chamadoProjection } from '../../DTOs/Projections/chamadoProjection';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { QuadroChamadosComponent } from '../../components/quadro-chamados/quadro-chamados.component';

@Component({
  selector: 'app-chamados-pendentes',
  imports: [QuadroChamadosComponent],
  templateUrl: './chamados-pendentes.component.html',
  styleUrls: ['./chamados-pendentes.component.css']
})
export class ChamadosPendentesComponent {

  chamadosAlta = [
    { data: '06/05/25', descricao: 'Computador quebrado', local: 'Lab. 2' }
  ];

  chamadosMedia = [
    { data: '00/00/00', descricao: 'Nome', local: 'Local' }
  ];

  chamadosBaixa = [
    { data: '00/00/00', descricao: 'Nome', local: 'Local' }
  ];


  //implements OnInit {
  // chamadosConcluidos: chamadoProjection[] = [];
  
  //   constructor(private funcionarioService: FuncionarioService) {}
  
  //   ngOnInit(): void {
  //     this.funcionarioService.getAllChamadosPendentes().subscribe((resp) => {
  //       console.log('Chamados pendentes:', resp);
  //       this.chamadosConcluidos = resp;
  //     });
  //   }
}
