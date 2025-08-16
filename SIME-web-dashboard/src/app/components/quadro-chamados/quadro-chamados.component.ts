import { Component, Input } from '@angular/core';
import { ChamadoCardComponent } from '../chamado-card/chamado-card.component';

@Component({
  selector: 'app-quadro-chamados',
  imports: [ChamadoCardComponent],
  templateUrl: './quadro-chamados.component.html',
  styleUrl: './quadro-chamados.component.css'
})
export class QuadroChamadosComponent {
  @Input() imgAlta: string = '';
  @Input() imgMedia: string = '';
  @Input() imgBaixa: string = '';

  @Input() chamadosAlta: any[] = [];
  @Input() chamadosMedia: any[] = [];
  @Input() chamadosBaixa: any[] = [];
}
