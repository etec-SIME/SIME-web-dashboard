import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ChamadoRequestDTO } from '../../DTOs/ChamadoRequestDTO';
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
  @Input() ambiente!: string | null;
  @Input() chamados: chamadosAmbienteDTO[] = [];
  @Input() ambientes: AmbienteSelectDTO[] = [];
  @Input() tiposChamado: TipoChamadoSelectDTO[] = [];

  get chamadosFiltrados(){
    if (!this.chamados || !this.tiposChamado){ //|| !this.ambientes || !this.tiposChamado || !this.ambiente
      return [];
    }

    return this.chamados.map(chamado => ({
        /*const tipo = this.tiposChamado.find(t =>
          Number(t.idTipoChamado) === Number(chamado.TipoChamado.idTipoChamado));

        return {};*/
          ...chamado,
          dataAberturaFormatada: this.formatarData(chamado.dataAbertura),
          nomeTipoChamado: chamado.tipoChamado?.nomeTipoChamado || "Tipo do Chamado não encontrado."

      }));
  }

  public formatarData(data: string): string {
    if (!data){
      console.log("Data vazia");
      return '';
    }
    return data.split('T')[0].split('-').reverse().join('/');
  }

}
