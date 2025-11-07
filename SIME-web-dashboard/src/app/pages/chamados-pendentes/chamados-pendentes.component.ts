import { Component, OnInit } from '@angular/core';
import { QuadroChamadosComponent } from '../../components/quadro-chamados/quadro-chamados.component';
import { ChamadoCardDTO } from '../../DTOs/ChamadoCardDTO';
import { ChamadoService } from '../../services/chamado/chamado.service';
import { sharedImports } from '../../shared/shared-imports';

@Component({
  selector: 'app-chamados-pendentes',
  imports: [QuadroChamadosComponent, sharedImports],
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
    console.log('Chamados de alta prioridade: ', this.chamadosAlta);
    console.log('Chamados de média prioridade: ', this.chamadosMedia);
    console.log('Chamados de baixa prioridade: ', this.chamadosBaixa);
  }

  carregarChamados(): void {
    this.chamadoService.getChamadosByPrioridade('ALTA_PRIORIDADE')
      .subscribe(res => {
        this.chamadosAlta = res.filter(chamado => chamado.statusAtualGeralChamado != 'Concluído');
        console.log('Chamados recebidos: ', res);
      });

    this.chamadoService.getChamadosByPrioridade('MEDIA_PRIORIDADE')
      .subscribe(res => {
        this.chamadosMedia = res.filter(chamado => chamado.statusAtualGeralChamado != 'Concluído');
      });

    this.chamadoService.getChamadosByPrioridade('BAIXA_PRIORIDADE')
      .subscribe(res => {
        this.chamadosBaixa = res.filter(chamado => chamado.statusAtualGeralChamado != 'Concluído');
      });
  }
}
