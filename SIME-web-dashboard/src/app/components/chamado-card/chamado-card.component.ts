import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chamado-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chamado-card.component.html',
  styleUrl: './chamado-card.component.css',
})
export class ChamadoCardComponent {
  @Input() data!: string;
  @Input() descricao!: string;
  @Input() titulo!: string;
  @Input() local!: string;
  @Input() numLocal!: number;
  @Input() prioridade!: 'ALTA_PRIORIDADE' | 'MEDIA_PRIORIDADE' | 'BAIXA_PRIORIDADE';
  @Input() idChamado!: number;

  constructor(private router: Router) {}

  navigate() {
    this.router.navigate(['/layout/chamado', this.idChamado]);
  }
}
