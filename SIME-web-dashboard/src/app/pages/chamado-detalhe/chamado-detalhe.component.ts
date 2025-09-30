import { Component, Input } from '@angular/core';
import { ChamadoService } from '../../services/chamado/chamado.service';

@Component({
  selector: 'app-chamado-detalhe',
  imports: [],
  templateUrl: './chamado-detalhe.component.html',
  styleUrl: './chamado-detalhe.component.css'
})
export class ChamadoDetalheComponent {
  iconePrioridade: any = {
    Alta: "/images/pendentes/altaPrioridade.svg",
    Media: "/images/pendentes/mediaPrioridade.svg",
    Baixa: "/images/pendentes/baixaPrioridade.svg"
  };

  etapas = [
    { nome: 'Em análise', data: 'Segunda, 21/07/2025' },
    { nome: 'Aprovado', data: 'Quarta, 23/07/2025' },
    { nome: 'Análise da APM', data: 'Quinta, 24/07/2025' },
    { nome: 'Em andamento', data: 'Segunda, 28/07/2025' },
    { nome: 'Concluído', data: 'Quarta, 30/07/2025' },
  ];

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
