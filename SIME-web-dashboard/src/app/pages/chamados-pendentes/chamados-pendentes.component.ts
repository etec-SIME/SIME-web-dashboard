import { Component, OnInit } from '@angular/core';
import { QuadroChamadosComponent } from '../../components/quadro-chamados/quadro-chamados.component';
import { ChamadoCardDTO } from '../../DTOs/ChamadoCardDTO';
import { ChamadoService } from '../../services/chamado/chamado.service';

@Component({
  selector: 'app-chamados-pendentes',
  imports: [QuadroChamadosComponent],
  templateUrl: './chamados-pendentes.component.html',
  styleUrls: ['./chamados-pendentes.component.css']
})
export class ChamadosPendentesComponent {

  chamadosAlta: ChamadoCardDTO[] = [];
  chamadosMedia: ChamadoCardDTO[] = [];
  chamadosBaixa: ChamadoCardDTO[] = [];

  constructor(private chamadoService: ChamadoService) {}

  ngOnInit(): void {
    this.carregarChamados();
  }

  carregarChamados(): void {
    this.chamadoService.getChamadosByPrioridade('ALTA_PRIORIDADE')
      .subscribe(res => {
        this.chamadosAlta = res;
        console.log('Chamados recebidos: ', res);
      });

    this.chamadoService.getChamadosByPrioridade('MEDIA_PRIORIDADE')
      .subscribe(res => this.chamadosMedia = res);

    this.chamadoService.getChamadosByPrioridade('BAIXA_PRIORIDADE')
      .subscribe(res => this.chamadosBaixa = res);
  }

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
