import { Component, Input, ViewChild } from '@angular/core';
import { ChamadoService } from '../../services/chamado/chamado.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChamadoResponseDTO } from '../../DTOs/ChamadoResponseDTO';
import { CommonModule } from '@angular/common';
import { ChamadoStatusResponseDTO, historicoChamadoList } from '../../DTOs/ChamadoStatusResponseDTO';
import { forkJoin } from 'rxjs';
import { sharedImports } from '../../shared/shared-imports';

@Component({
  selector: 'app-chamado-detalhe',
  imports: [RouterModule, CommonModule, sharedImports],
  standalone: true,
  templateUrl: './chamado-detalhe.component.html',
  styleUrl: './chamado-detalhe.component.css'
})
export class ChamadoDetalheComponent {
  chamado: ChamadoResponseDTO | null = null;
  progresso: ChamadoStatusResponseDTO | null = null;

  imagensUrl: string[] = [];
    etapas: { nome: string, data?: string }[] = [
    { nome: 'Em análise' },
    { nome: 'Aprovado' },
    { nome: 'Análise da APM' },
    { nome: 'Em andamento' },
    { nome: 'Concluído' }
  ];
  etapaAtualIndex: number = 0;

  idChamado!: number;
  titulo: string = 'Detalhes do Chamado';

  imagemSelecionada: string | null = null;
  modalAberto: boolean = false;
  imagemModal: string | null = null;

  isConcluido: boolean = false;
  isEmAnalise: boolean = false;

  iconePrioridade: any = {
    'Alta': "/images/pendentes/altaPrioridade.svg",
    'Média': "/images/pendentes/mediaPrioridade.svg",
    'Baixa': "/images/pendentes/baixaPrioridade.svg"
  };

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
    forkJoin({
      chamado: this.chamadoService.getDetalheChamado(id),
      progresso: this.chamadoService.getStatusChamado(id)
    }).subscribe({
      next: ({chamado, progresso}) => {
        this.chamado = chamado;
        this.imagensUrl = chamado.caminhoImagensList?.map((caminho) => `http://localhost:8080${caminho}`) || [];
        this.imagemSelecionada = this.imagensUrl[0] || null;

        this.progresso = progresso;

        //console.log(progresso.historicoChamadoList);

        if (progresso.statusAtualProgressoChamado === 'Concluído') {
          this.isConcluido = true;
          this.chamadoService.atualizarStatusGeral(this.idChamado, 'CONCLUIDO').subscribe({
            //next: res => console.log('Status geral atualizado para CONCLUIDO:', res),
            error: err => console.error('Erro ao atualizar status geral:', err)
          });
        } 
        else if (progresso.statusAtualProgressoChamado !== 'Concluído' && progresso.statusAtualProgressoChamado !== 'Em análise') {
          this.chamadoService.atualizarStatusGeral(this.idChamado, 'PENDENTE').subscribe({
            //next: res => console.log('Status geral atualizado para PENDENTE:', res),
            error: err => console.error('Erro ao atualizar status geral:', err)
          });
        }
        else if (progresso.statusAtualProgressoChamado === 'Em análise') {
          this.isEmAnalise = true;
          this.chamadoService.atualizarStatusGeral(this.idChamado, 'AGUARDANDO_APROVACAO').subscribe({
            //next: res => console.log('Status geral atualizado para AGUARDANDO_APROVACAO', res),
            error: err => console.error('Erro ao atualizar status geral', err)
          });
        }

        this.etapas.forEach((etapa, index) => {
          if (index === 0) {
            const dataAbertura = chamado.dtAberturaChamado;
            etapa.data = `${this.obterDiaSemana(dataAbertura)}, ${this.formatarData(dataAbertura)}`;
          } else {
              const itemHistorico = progresso.historicoChamadoList
                .filter(h => h.statusProgresso === etapa.nome)
                .reduce<historicoChamadoList | null>((latest, current) => 
                  !latest || new Date(current.dtAlteracao) > new Date(latest.dtAlteracao) ? current : latest
                , null);

              if (itemHistorico) {
                etapa.data = `${itemHistorico.diaSemana}, ${this.formatarData(itemHistorico.dtAlteracao)}`;
              }
          }
        });

        this.etapaAtualIndex = this.etapas.findIndex(
          e => e.nome === progresso.statusAtualProgressoChamado
        );
        if (this.etapaAtualIndex === -1) this.etapaAtualIndex = 0;

        //Apaga datas das etapas futuras
        this.etapas = this.etapas.map((etapa, index) => {
        if (index > this.etapaAtualIndex) {
          return { ...etapa, data: undefined };
        }
          return etapa;
        });

        // console.log('Detalhe do chamado recebido: ', chamado);
        // console.log('Imagens URLs: ', this.imagensUrl);
        // console.log('Progresso do chamado recebido: ', progresso);
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes do chamado ou progresso:', err);
      }
    })
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

  nextStatus(event: Event) {
    event.stopPropagation();
    if (this.etapaAtualIndex < this.etapas.length - 1) {
      this.isEmAnalise = false;

      const novoIndex = this.etapaAtualIndex + 1;
      let novoStatus = this.etapas[novoIndex].nome
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
        .replace(/\s+/g, '_');

      this.etapas = this.etapas.map((etapa, index) => {
      if (index > novoIndex) {
        return { ...etapa, data: undefined };
      }
        return etapa;
      });

      this.atualizarStatusChamado(novoStatus);
    } else {
      console.log('Já está na última etapa.');
    }
  }

  prevStatus(event: Event) {
    event.stopPropagation();
    if (this.etapaAtualIndex > 0) {
      this.isConcluido = false;

      const novoIndex = this.etapaAtualIndex - 1;
      let novoStatus = this.etapas[novoIndex].nome
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toUpperCase()
          .replace(/\s+/g, '_');

      this.etapas = this.etapas.map((etapa, index) => {
      if (index > novoIndex) {
        return { ...etapa, data: undefined };
      }
        return etapa;
      });

      this.atualizarStatusChamado(novoStatus);
    } else {
      console.log('Já está na primeira etapa.');
    }
  }

  atualizarStatusChamado(novoStatus: string) {
    this.chamadoService.atualizarStatusProgresso(this.idChamado, novoStatus).subscribe({
      next: res => {
        //console.log('Status do chamado atualizado:', res);
        this.carregarChamado(this.idChamado);
      },
      error: err => console.error('Erro ao atualizar status do chamado:', err)
    });
  }

  voltar() {
    this.router.navigate(['/layout/home']);
  }

  aprovar() {
    console.log("Chamado aprovado!");
  }

  recusar() {
    console.log("Chamado recusado!");
  }

  private formatarData(dataISO: string): string {
    const data = new Date(dataISO);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  private obterDiaSemana(dataISO: string): string {
    const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const data = new Date(dataISO);
    return dias[data.getDay()];
  }

}
