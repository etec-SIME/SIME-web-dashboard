import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChamadoService } from '../../services/chamado/chamado.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private chamadoService: ChamadoService) { }

  getAllChamados() {
    this.chamadoService.getAllChamados().subscribe({
      next: (chamados) => console.log('Chamados recebidos: ', chamados),
      error: (err) => console.error('Erro ao buscar chamados: ', err),
    });
  }
}
