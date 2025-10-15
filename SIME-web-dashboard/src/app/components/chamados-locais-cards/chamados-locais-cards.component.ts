import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChamadoRequestDTO } from '../../DTOs/ChamadoRequestDTO';
import { TipoChamadoSelectDTO } from '../../DTOs/TipoChamadoSelectDTO';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';

@Component({
  selector: 'app-chamados-locais-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chamados-locais-cards.component.html',
  styleUrl: './chamados-locais-cards.component.css'
})
export class ChamadosLocaisCardsComponent {
  @Input() ambiente!: string;
  @Input() chamados!: ChamadoRequestDTO[];
  @Input() ambientes!: AmbienteSelectDTO[];
  @Input() tiposChamado!: TipoChamadoSelectDTO[];

  get chamadosFiltrados(){
    const ambiente = this.ambientes.find(a =>
      this.ambiente.includes(a.numAmbiente.toString())
    );

    return this.chamados
      .filter(c => c.idAmbiente === ambiente?.idAmbiente)
      .map(chamado => {
        const tipo = this.tiposChamado.find(t => t.idTipoChamado === chamado.idTipoChamado);
        
        return {
          ...chamado,
          nomeTipoChamado: tipo ? tipo.nomeTipoChamado: "Tipo do Chamado não encontrado."
        };
      });
  }
}
