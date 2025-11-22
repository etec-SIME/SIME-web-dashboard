import { Component, Input } from '@angular/core';
import { ChamadoCardComponent } from '../chamado-card/chamado-card.component';
import { ChamadoCardDTO } from '../../DTOs/ChamadoCardDTO';
import { RouterModule } from '@angular/router';
import { ChamadoService } from '../../services/chamado/chamado.service';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-quadro-chamados',
  standalone: true,
  imports: [ChamadoCardComponent, RouterModule, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './quadro-chamados.component.html',
  styleUrl: './quadro-chamados.component.css'
})
export class QuadroChamadosComponent {
  constructor(private chamadoService: ChamadoService) {}

  @Input() imgAlta: string = '';
  @Input() imgMedia: string = '';
  @Input() imgBaixa: string = '';

  @Input() chamadosAlta: ChamadoCardDTO[] = [];
  @Input() chamadosMedia: ChamadoCardDTO[] = [];
  @Input() chamadosBaixa: ChamadoCardDTO[] = [];

  atualizarPrioridade(idChamado: number, novaPrioridade: string) {
    this.chamadoService.atualizarPrioridadeChamado(idChamado, novaPrioridade).subscribe(() => {
      console.log(`Prioridade do chamado ${idChamado} atualizada para ${novaPrioridade}`);
    });
  }
  
  drop(event: CdkDragDrop<any[]>, novaPrioridade: string) {

    if (event.previousContainer === event.container) {
        // mesma lista
        moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );
    } else {
        // outra lista
        transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );

        const chamado = event.container.data[event.currentIndex];

        this.atualizarPrioridade(chamado.idChamado, novaPrioridade);
    }
  }
}
