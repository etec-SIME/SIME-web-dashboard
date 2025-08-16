import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chamado-card',
  imports: [CommonModule],
  templateUrl: './chamado-card.component.html',
  styleUrl: './chamado-card.component.css'
})
export class ChamadoCardComponent {
  @Input() data!: string;
  @Input() descricao!: string;
  @Input() local!: string;
  @Input() prioridade!: 'Alta' | 'Média' | 'Baixa';
}
