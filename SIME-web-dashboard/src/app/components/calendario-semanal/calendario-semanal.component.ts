import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendario-semanal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario-semanal.component.html',
  styleUrls: ['./calendario-semanal.component.css']
})
export class CalendarioSemanalComponent {
  diasDaSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  diasNum: number[] = [];

  diaAtualNum!: number;
  diaAtualSemana!: number;

  constructor() {
    const hoje = new Date();
    this.diaAtualNum = hoje.getDate();
    this.diaAtualSemana = hoje.getDay(); // 0 = Domingo

    // Data do domingo da semana atual
    const domingo = new Date(hoje);
    domingo.setDate(hoje.getDate() - this.diaAtualSemana);

    // Criar os 7 dias da semana (número do dia do mês)
    this.diasNum = Array.from({ length: 7 }, (_, i) => {
      const data = new Date(domingo);
      data.setDate(domingo.getDate() + i);
      return data.getDate();
    });
  }

}
