import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendario-mensal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario-mensal.component.html',
  styleUrls: ['./calendario-mensal.component.css']
})
export class CalendarioMensalComponent {
  mesAnoAtual: string;
  diasDoMes: number[] = [];
  ultimosDiasMesAnterior: number[] = [];

  constructor() {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const hoje = new Date();
    const mes = hoje.getMonth();
    const ano = hoje.getFullYear();

    this.mesAnoAtual = `${meses[mes]} - ${ano}`;

    /* Descobre quantos dias tem o mês atual, pois usamos o Date para o mês seguinte (mes + 1), 
    mas o 0 verifica o último dia do mês anterior (que seria o mês atual) */
    const totalDias = new Date(ano, mes + 1, 0).getDate();

    // Dia da semana do primeiro dia do mês (0 = Domingo, 1 = Segunda...)
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();

    // Cria array para os dias do mês (1, 2, 3, ..., totalDias)
    this.diasDoMes = Array.from({ length: totalDias }, (_, i) => i + 1);

    // Para os últimos dias do mês anterior:
    // Descobre quantos dias tem o mês anterior
    const totalDiasMesAnterior = new Date(ano, mes, 0).getDate();

    // Pega os últimos 'primeiroDiaSemana' dias do mês anterior para mostrar antes do 1º dia
    this.ultimosDiasMesAnterior = Array.from(
      { length: primeiroDiaSemana },
      (_, i) => totalDiasMesAnterior - primeiroDiaSemana + 1 + i
    );
  }
}
