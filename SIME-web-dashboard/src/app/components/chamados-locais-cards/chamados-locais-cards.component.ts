import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ChamadoRequestDTO } from '../../DTOs/ChamadoRequestDTO';
import { TipoChamadoSelectDTO } from '../../DTOs/TipoChamadoSelectDTO';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';

type ChamadoComTipo = ChamadoRequestDTO & { nomeTipoChamado: string };

@Component({
  selector: 'app-chamados-locais-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chamados-locais-cards.component.html',
  styleUrl: './chamados-locais-cards.component.css'
})
export class ChamadosLocaisCardsComponent {
  @Input() ambiente!: string | null;
  @Input() chamados: ChamadoRequestDTO[] = [];
  @Input() ambientes: AmbienteSelectDTO[] = [];
  @Input() tiposChamado: TipoChamadoSelectDTO[] = [];

  constructor(private location: Location) {}

  get chamadosFiltrados(): ChamadoComTipo[] {
    if (!this.chamados || !this.ambientes || !this.tiposChamado || !this.ambiente){
      return [];
    }
    
    const ambienteEncontrado = this.ambientes.find(a =>
      this.ambiente?.includes(a.numAmbiente.toString())
    );

    if(!ambienteEncontrado){
      return [];
    }

    return this.chamados
      .filter(c => c.idAmbiente === ambienteEncontrado?.idAmbiente)
      .map((chamado): ChamadoComTipo => {
        const tipo = this.tiposChamado.find(t => 
          Number(t.idTipoChamado) === Number(chamado.idTipoChamado));
        
        const data = chamado.dataAbertura instanceof Date
          ? chamado.dataAbertura
          : new Date(chamado.dataAbertura);

        return {
          ...chamado,
          dataAbertura: data,
          nomeTipoChamado: tipo ? tipo.nomeTipoChamado: "Tipo do Chamado não encontrado."
        };
      });
  }

  voltarLocais(): void{
    this.location.back();
  }

}
