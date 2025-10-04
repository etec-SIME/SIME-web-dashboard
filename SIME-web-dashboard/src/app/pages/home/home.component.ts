import { Component, OnInit } from '@angular/core';
import { CalendarioMensalComponent } from "../../components/calendario-mensal/calendario-mensal.component";
import { CalendarioSemanalComponent } from "../../components/calendario-semanal/calendario-semanal.component";
import { tipoAmbiente } from '../../models/tipoAmbiente';
import { tipoAmbienteRequestDTO } from '../../DTOs/tipoAmbienteRequestDTO';
import { forkJoin } from 'rxjs';
import { EscolaService } from '../../services/escola/escola.service';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';
import { ambienteRequestDTO } from '../../DTOs/ambienteRequestDTO';
import { CommonModule } from '@angular/common';
import { ChamadoRequestDTO } from '../../DTOs/ChamadoRequestDTO';
import { ChamadoService } from '../../services/chamado/chamado.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CalendarioMensalComponent, CalendarioSemanalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  opcaoAtual: 'salas' | 'labs' | 'outros' = 'salas';

  tipoAmbientes: tipoAmbienteRequestDTO[] = [];
  ambientes: AmbienteSelectDTO[] = []; //ambienteRequestDTO
  chamados: ChamadoRequestDTO[] = [];

  carregado: boolean = false;

  // Estrutura de exibição dos cards no html
  cards: {nome: string; chamados: string}[] = [];

  constructor(private escolaService: EscolaService, private chamadoService: ChamadoService){}

  ngOnInit(): void {
    this.setOpcao('salas');
  }

  setOpcao(opcao: 'salas' | 'labs' | 'outros') {
    this.opcaoAtual = opcao;
    this.carregarDados();

    /*if (opcao === 'salas')
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
    }*/
  }

  carregarDados(): void {
    this.carregado = false;

    // Fazer as duas requisições paralelas
    forkJoin({
      tipos: this.escolaService.getAllTipoAmbiente(),
      ambientes: this.escolaService.getAllAmbiente(),
      chamados: this.chamadoService.getAllChamados()
    }).subscribe({
      next: (res) => {
        this.tipoAmbientes = res.tipos;
        this.ambientes = res.ambientes;
        this.chamados = res.chamados;
 
        // Filtrar ambiente pelos tipos de ambientes
        let tiposFiltrados: tipoAmbienteRequestDTO[] = [];

        if (this.opcaoAtual === 'salas'){
          tiposFiltrados = this.tipoAmbientes.filter(t =>
            t.nomeTipoAmbiente.toLowerCase().includes('sala')
          );
        } else if (this.opcaoAtual === 'labs'){
          tiposFiltrados = this.tipoAmbientes.filter(t =>
            t.nomeTipoAmbiente.toLowerCase().includes('laboratório')
          );
        } else {
          // "outros" pega tudo que não for sala nem laboratório
          tiposFiltrados = this.tipoAmbientes.filter( t =>
            !t.nomeTipoAmbiente.toLowerCase().includes('salas') &&
            !t.nomeTipoAmbiente.toLowerCase().includes('laboratório')
          );
        }

        // Montar os cards dinâmicos para cada ambiente do tipo filtrado
        this.cards = this.ambientes
          .filter(a => tiposFiltrados.some(t => t.idTipoAmbiente === a.idTipoAmbiente))
          .map(a =>{
            const tipo = tiposFiltrados.find(t => t.idTipoAmbiente === a.idTipoAmbiente);
            
            const qtdChamados = this.chamados.filter(c => c.idAmbiente === a.idAmbiente).length;

            return{
              nome: `${tipo?.nomeTipoAmbiente} ${a.numAmbiente}`, // Usar crase
              chamados: qtdChamados.toString()
            };
          });

          this.carregado = true;
        },
        error: (err) => {
        console.error('Erro ao carregar dados:', err);
      }
    });
  }

}
