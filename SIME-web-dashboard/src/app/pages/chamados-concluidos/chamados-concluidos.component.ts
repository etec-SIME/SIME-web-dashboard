import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { chamadoProjection } from '../../DTOs/Projections/chamadoProjection';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { QuadroChamadosComponent } from '../../components/quadro-chamados/quadro-chamados.component';
import { ChamadoCardDTO } from '../../DTOs/ChamadoCardDTO';
import { ChamadoService } from '../../services/chamado/chamado.service';

@Component({
  selector: 'app-chamados-concluidos',
  imports: [RouterModule, QuadroChamadosComponent],
  templateUrl: './chamados-concluidos.component.html',
  styleUrl: './chamados-concluidos.component.css'
})
export class ChamadosConcluidosComponent {

  chamadosAlta: ChamadoCardDTO[] = [];
  chamadosMedia: ChamadoCardDTO[] = [];
  chamadosBaixa: ChamadoCardDTO[] = [];

  constructor(private chamadoService: ChamadoService) {}

  ngOnInit(): void {
    this.carregarChamados();
  }

  carregarChamados(): void {
    this.chamadoService.getChamadosByPrioridadeAndStatus('ALTA_PRIORIDADE', 'CONCLUIDO')
      .subscribe(res => this.chamadosAlta = res);

    this.chamadoService.getChamadosByPrioridadeAndStatus('MEDIA_PRIORIDADE', 'CONCLUIDO')
      .subscribe(res => this.chamadosMedia = res);

    this.chamadoService.getChamadosByPrioridadeAndStatus('BAIXA_PRIORIDADE', 'CONCLUIDO')
      .subscribe(res => this.chamadosBaixa = res);
  }

  // chamadosConcluidos: chamadoProjection[] = [];

  // constructor(private funcionarioService: FuncionarioService) {}

  // ngOnInit(): void {
  //   this.funcionarioService.getAllChamadosConcluidos().subscribe((resp) => {
  //     console.log('Chamados concluidos:', resp);
  //     this.chamadosConcluidos = resp;
  //   });
  // }

}
