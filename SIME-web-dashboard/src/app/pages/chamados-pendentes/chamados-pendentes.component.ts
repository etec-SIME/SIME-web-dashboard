import { Component, OnInit } from '@angular/core';
import { chamadoProjection } from '../../DTOs/Projections/chamadoProjection';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';

@Component({
  selector: 'app-chamados-pendentes',
  imports: [],
  templateUrl: './chamados-pendentes.component.html',
  styleUrls: ['./chamados-pendentes.component.css']
})
export class ChamadosPendentesComponent { //implements OnInit {
  // chamadosConcluidos: chamadoProjection[] = [];
  
  //   constructor(private funcionarioService: FuncionarioService) {}
  
  //   ngOnInit(): void {
  //     this.funcionarioService.getAllChamadosPendentes().subscribe((resp) => {
  //       console.log('Chamados pendentes:', resp);
  //       this.chamadosConcluidos = resp;
  //     });
  //   }
}
