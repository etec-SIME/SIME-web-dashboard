import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { chamadoProjection } from '../../DTOs/Projections/chamadoProjection';

@Component({
  selector: 'app-chamados-pendentes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './chamados-pendentes.component.html',
  styleUrl: './chamados-pendentes.component.css'
})
export class ChamadosPendentesComponent implements OnInit{

  chamadosConcluidos: chamadoProjection[] = [];
  
    constructor(private funcionarioService: FuncionarioService) {}
  
    ngOnInit(): void {
      this.funcionarioService.getAllChamadosPendentes().subscribe((resp) => {
        console.log('Chamados pendentes:', resp);
        this.chamadosConcluidos = resp;
      });
    }

}
