import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChamadoService } from '../../services/chamado/chamado.service';
import { chamadoRequestDTO } from '../../DTOs/chamadoRequestDTO';

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

  criarChamado() {
    const dto: chamadoRequestDTO = {
      tituloChamado: "Problema no projetor",
      descChamado: "O projetor da sala 101 não está ligando",
      localChamado: "Sala 101",
      emailUsuario: "usuario@email.com",
      tipoChamado: "Problema Técnico",
      imgChamado: "base64ouURLdaImagem"
    };
    
    this.chamadoService.criarChamado('123456', dto).subscribe({
      next: (res) => {
        console.log('Resposta do backend:', res); 
      },
      error: (err) => {
        console.error('Erro ao criar chamado:', err);
      }
    });
  }
}
