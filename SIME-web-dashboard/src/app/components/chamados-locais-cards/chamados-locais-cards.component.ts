import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TipoChamadoSelectDTO } from '../../DTOs/TipoChamadoSelectDTO';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';
import { chamadosAmbienteDTO } from '../../DTOs/chamadosAmbienteDTO';


@Component({
  selector: 'app-chamados-locais-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chamados-locais-cards.component.html',
  styleUrl: './chamados-locais-cards.component.css'
})
export class ChamadosLocaisCardsComponent {
  @Input() chamados: chamadosAmbienteDTO[] = [];

  chamadosFiltrados: any[] = [];

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void{
    if (changes['chamados'] && this.chamados?.length > 0){
      this.processarChamados();
    }
  }

  public processarChamados(): void{
    this.chamadosFiltrados = this.chamados.map( chamado => ({
      ...chamado,
      tituloChamado: chamado.tituloChamado || "Título do chamado não identificado",
      dataAberturaFormatada: this.formatarData(chamado.dtAberturaChamado) || "Sem data",
      nomeTipoChamado: chamado.tipoChamado?.nomeTipoChamado || "Tipo do Chamado não encontrado."
      }))
  };

  public formatarData(data: string): string {
    if (!data) {
      console.log("Data vazia:", data);
      return '';
    }

    const partesData = data.split('T')[0].split('-');
    if (partesData.length !== 3){
      console.log("Formato inesperado de data:", data);
      return '';
    };

    const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
    console.log("Data formatada:", dataFormatada);
    return dataFormatada;
  }

  abrirDetalhamentoChamado(chamado : any): void{
    if (!chamado.idChamado) {
      console.error('Chamado sem ID: não foi possível encontrar o detalhamento');
      return;
    }
    
    this.router.navigate(['/layout/chamado/', chamado.idChamado]);

  }

}
