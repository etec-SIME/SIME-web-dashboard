import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChange } from '@angular/core';
import { Location } from '@angular/common';
import { ChamadoRequestDTO } from '../../DTOs/ChamadoRequestDTO';
import { TipoChamadoSelectDTO } from '../../DTOs/TipoChamadoSelectDTO';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';
import { ChamadosAmbienteDTO } from '../../DTOs/ChamadosAmbienteDTO';


@Component({
  selector: 'app-chamados-locais-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chamados-locais-cards.component.html',
  styleUrl: './chamados-locais-cards.component.css'
})
export class ChamadosLocaisCardsComponent {
  @Input() ambiente!: string | null;
  @Input() chamados: ChamadosAmbienteDTO[] = [];
  @Input() ambientes: AmbienteSelectDTO[] = [];
  @Input() tiposChamado: TipoChamadoSelectDTO[] = [];

  chamadosFiltrados: any[] = [];

  ngOnChanges(changes: SimpleChange): void{
    if (changes['chamados' && this.chamados?.length > 0]){
      this.processarChamados();
    }
  }

  public processarChamados(): void{
    this.chamadosFiltrados = this.chamados.map( chamado => ({
      ...chamado,
      dataAberturaFormatada: this.formatarData(chamado.dataAbertura) || "Sem data",
      nomeTipoChamado: chamado.tipoChamado?.nomeTipoChamado || "Tipo do Chamado não encontrado."
      }))
  };

  public formatarData(data: string): string {
    if (!data) return '';
    const partes = data.split('T')[0].split('-').reverse().join('/');
    if (partes.length !== 3) return '';
    const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
    console.log("Data formatada:", dataFormatada);
    return dataFormatada;
  }

}
