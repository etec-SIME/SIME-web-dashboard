import { Component, Input } from '@angular/core';
import { ChamadoService } from '../../services/chamado/chamado.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChamadoResponseDTO } from '../../DTOs/ChamadoResponseDTO';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-chamado-detalhe',
  imports: [RouterModule, CommonModule],
  templateUrl: './chamado-detalhe.component.html',
  styleUrl: './chamado-detalhe.component.css'
})
export class ChamadoDetalheComponent {
  chamado: ChamadoResponseDTO | null = null;
  imagensUrl: string[] = [];
  idChamado!: number;
  titulo: string = 'Detalhes do Chamado';

  imagemSelecionada: string | null = null;
  modalAberto: boolean = false;
  imagemModal: string | null = null;

  iconePrioridade: any = {
    'Alta Prioridade': "/images/pendentes/altaPrioridade.svg",
    'Média Prioridade': "/images/pendentes/mediaPrioridade.svg",
    'Baixa Prioridade': "/images/pendentes/baixaPrioridade.svg"
  };

  etapas = [
    { nome: 'Em análise', data: 'Segunda, 21/07/2025' },
    { nome: 'Aprovado', data: 'Quarta, 23/07/2025' },
    { nome: 'Análise da APM', data: 'Quinta, 24/07/2025' },
    { nome: 'Em andamento', data: 'Segunda, 28/07/2025' },
    { nome: 'Concluído', data: 'Quarta, 30/07/2025' },
  ];

  etapaAtual = 1;

  constructor(
    private chamadoService: ChamadoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.idChamado = +this.route.snapshot.paramMap.get('id')!;
    this.carregarChamado(this.idChamado);
  }

  carregarChamado(id: number): void {
    this.chamadoService.getDetalheChamado(id)
      .subscribe(chamado => {
        this.chamado = chamado;
        this.imagensUrl = chamado.caminhoImagensList?.map(caminho => `http://localhost:8080${caminho}`);
        this.imagemSelecionada = this.imagensUrl[0] || null;

        console.log('Detalhe do chamado recebido: ', chamado);
        console.log('Imagens URLs: ', this.imagensUrl);
      });
  }

  abrirModal(imagem: string) {
    this.imagemModal = imagem;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.imagemModal = null;
  }

  prevImagem(event: Event) {
    event.stopPropagation();
    const index = this.imagensUrl.indexOf(this.imagemModal!);
    const prevIndex = (index - 1 + this.imagensUrl.length) % this.imagensUrl.length;
    this.imagemModal = this.imagensUrl[prevIndex];
  }

  nextImagem(event: Event) {
    event.stopPropagation();
    const index = this.imagensUrl.indexOf(this.imagemModal!);
    const nextIndex = (index + 1) % this.imagensUrl.length;
    this.imagemModal = this.imagensUrl[nextIndex];
  }

  voltar() {
    this.router.navigate(['/layout/chamados-pendentes']);
  }

  aprovar() {
    console.log("Chamado aprovado!");
  }

  recusar() {
    console.log("Chamado recusado!");
  }
}
