import { Component, OnInit } from '@angular/core';
import { CalendarioMensalComponent } from "../../components/calendario-mensal/calendario-mensal.component";
import { CalendarioSemanalComponent } from "../../components/calendario-semanal/calendario-semanal.component";
import { tipoAmbiente } from '../../models/tipoAmbiente';
import { tipoAmbienteRequestDTO } from '../../DTOs/tipoAmbienteRequestDTO';
import { EscolaService } from '../../services/escola/escola.service';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';
import { ambienteRequestDTO } from '../../DTOs/ambienteRequestDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CalendarioMensalComponent, CalendarioSemanalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  opcaoAtual: 'salas' | 'labs' | 'outros' = 'salas';

  cards: {nome: string; chamados: string}[] = [];

  ngOnInit(): void {
    this.setOpcao('salas');
    //this.carregarDados();
  }

  setOpcao(opcao: 'salas' | 'labs' | 'outros') {
    this.opcaoAtual = opcao;

    if (opcao === 'salas')
    {
      this.cards = Array.from({ length: 4 }, (_, i) => ({
        nome: `Sala ${i + 1}`,
        chamados: `0${i + 1}` // só de exemplo, Sala 1 -> 1 chamado, Sala 2 -> 2 chamados...
      }));
    }

    if (opcao === 'labs')
    {
      this.cards = Array.from({ length: 4 }, (_, i) => ({
        nome: `Laboratório ${i + 1}`,
        chamados: `0${i + 1}`
      }));
    }

    if (opcao === 'outros')
    {
      const outros = ['Biblioteca', 'Auditório', 'Pátio', 'Área Verde'];
      this.cards = outros.map((nome, i) => ({
        nome,
        chamados: `0${i + 1}`
      }));
    }
  }

  constructor(private escolaService: EscolaService)
  {

  }

  tipoAmbientes: tipoAmbienteRequestDTO[] = [];
  ambientes: AmbienteSelectDTO[] = [];

  carregado: boolean = false;

  /*carregarDados() {
    this.escolaService.getAllTipoAmbiente().subscribe({
      next: (tipos) => {
        this.tipoAmbientes = tipos;

        this.escolaService.getAllAmbiente().subscribe({
          next: (ambs: ambienteRequestDTO[]) => {
            // Faz o mapeamento de ambienteRequestDTO -> AmbienteSelectDTO
            this.ambientes = ambs.map((amb, index) => {
              const tipo = this.tipoAmbientes.find(t => t.idTipoAmbiente === amb.idTipoAmbiente);

              return {
                idAmbiente: index + 1, // se o backend não retornar idAmbiente, gera aqui
                numAmbiente: amb.numAmbiente,
                idTipoAmbiente: amb.idTipoAmbiente,
                nomeTipoAmbiente: tipo ? tipo.nomeTipoAmbiente : "Desconhecido"
              } as AmbienteSelectDTO;
            });

            this.carregado = true;
          },
          error: () => alert("Erro ao carregar os ambientes")
        });
      },
      error: () => alert("Erro ao carregar os tipos dos ambientes")
    });
  }

  get ambientesFiltrados(): AmbienteSelectDTO[] {
  return this.ambientes.filter(amb => {
    const tipo = amb.nomeTipoAmbiente.toLowerCase();

    if (this.opcaoAtual === 'salas') {
      return tipo.includes('sala'); // pega "Sala de Aula"
    }
    if (this.opcaoAtual === 'labs') {
      return tipo.includes('laboratório') || tipo.includes('lab'); // pega "Laboratório"
    }
    if (this.opcaoAtual === 'outros') {
      return !tipo.includes('sala') && !tipo.includes('laboratório') && !tipo.includes('lab');
      // pega o que não for Sala ou Laboratório
    }

    return false;
    });
  }*/

}
