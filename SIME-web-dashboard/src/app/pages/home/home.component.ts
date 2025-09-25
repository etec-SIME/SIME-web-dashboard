import { Component } from '@angular/core';
import { CalendarioMensalComponent } from "../../components/calendario-mensal/calendario-mensal.component";
import { CalendarioSemanalComponent } from "../../components/calendario-semanal/calendario-semanal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CalendarioMensalComponent, CalendarioSemanalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  opcaoAtual: 'salas' | 'labs' | 'outros' = 'salas';

  salas = [
    { nome: 'Sala 1', chamados: 1 },
    { nome: 'Sala 2', chamados: 2 },
    { nome: 'Sala 3', chamados: 3 },
    { nome: 'Sala 4', chamados: 4 }
  ];

  labs = [
    { nome: 'Lab 1', chamados: 1 },
    { nome: 'Lab 2', chamados: 2 }
  ];

  outros = [
    { nome: 'Biblioteca', chamados: 2 },
    { nome: 'Auditório', chamados: 3 }
  ];

  setOpcao(opcao: 'salas' | 'labs' | 'outros') {
    this.opcaoAtual = opcao;
  }

}
