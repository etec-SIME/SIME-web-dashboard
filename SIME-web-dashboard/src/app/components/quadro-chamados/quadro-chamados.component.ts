import { Component, Input } from '@angular/core';
import { ChamadoCardComponent } from '../chamado-card/chamado-card.component';
import { ChamadoCardDTO } from '../../DTOs/ChamadoCardDTO';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-quadro-chamados',
  standalone: true,
  imports: [ChamadoCardComponent],
  templateUrl: './quadro-chamados.component.html',
  styleUrl: './quadro-chamados.component.css'
})
export class QuadroChamadosComponent {
  @Input() imgAlta: string = '';
  @Input() imgMedia: string = '';
  @Input() imgBaixa: string = '';

  @Input() chamadosAlta: ChamadoCardDTO[] = [];
  @Input() chamadosMedia: ChamadoCardDTO[] = [];
  @Input() chamadosBaixa: ChamadoCardDTO[] = [];
}
