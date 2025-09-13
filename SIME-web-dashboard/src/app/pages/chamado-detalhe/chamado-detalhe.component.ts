import { Component } from '@angular/core';
import { ChamadoService } from '../../services/chamado/chamado.service';

@Component({
  selector: 'app-chamado-detalhe',
  imports: [],
  templateUrl: './chamado-detalhe.component.html',
  styleUrl: './chamado-detalhe.component.css'
})
export class ChamadoDetalheComponent {
  etapas = ['Em análise', 'Aprovado', 'Análise de APM', 'Em andamento', 'Concluído'];
  etapaAtual = 1;

  constructor(private chamadoService: ChamadoService) {}

  chamado = {
    titulo: 'Computador Quebrado',
    descricao: 'Cheguei no laboratório 2 e havia um computador que não estava ligando e a tela estava rachada',
    departamento: 'Informática',
    prioridade: 'Alta'
  };

  voltar() {
    console.log("Voltar clicado");
  }

  aprovar() {
    console.log("Chamado aprovado!");
  }

  recusar() {
    console.log("Chamado recusado!");
  }
}
