import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarioMensalComponent } from "../../components/calendario-mensal/calendario-mensal.component";
import { CalendarioSemanalComponent } from "../../components/calendario-semanal/calendario-semanal.component";
import { tipoAmbienteRequestDTO } from '../../DTOs/tipoAmbienteRequestDTO';
import { forkJoin } from 'rxjs';
import { EscolaService } from '../../services/escola/escola.service';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';
import { CommonModule } from '@angular/common';
import { ChamadoRequestDTO } from '../../DTOs/ChamadoRequestDTO';
import { ChamadoService } from '../../services/chamado/chamado.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarioMensalComponent, CalendarioSemanalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  tipoAmbientes: tipoAmbienteRequestDTO[] = [];
  ambientes: AmbienteSelectDTO[] = []; //ambienteRequestDTO
  chamados: ChamadoRequestDTO[] = [];

  opcaoAtual: 'salas' | 'labs' | 'outros' = 'salas';
  localPesquisa: string = '';
  carregado: boolean = false;

  // Estrutura de exibição dos cards no html
  cards: {nome: string; chamados: string}[] = [];
  cardsOriginais: {nome: string; chamados: string}[] = [];

  constructor(private escolaService: EscolaService, private chamadoService: ChamadoService){}

  ngOnInit(): void {
    this.setOpcao('salas');
  }

  setOpcao(opcao: 'salas' | 'labs' | 'outros') {
    this.opcaoAtual = opcao;
    this.localPesquisa = ''; // Vai limpar o campo quando mudar de aba
    this.carregarDados();
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
            !t.nomeTipoAmbiente.toLowerCase().includes('sala') &&
            !t.nomeTipoAmbiente.toLowerCase().includes('laboratório')
          );
        }

        // Montar os cards dinâmicos para cada ambiente do tipo filtrado
        const cardsMontados = this.ambientes
          .filter(a => tiposFiltrados.some(t => t.idTipoAmbiente === a.idTipoAmbiente))
          .map(a =>{
            const tipo = tiposFiltrados.find(t => t.idTipoAmbiente === a.idTipoAmbiente);
            const qtdChamados = this.chamados.filter(c => c.idAmbiente === a.idAmbiente).length;

            // Simplificar o nome se for um laboratório
            let nomeTipo = tipo?.nomeTipoAmbiente || '';
            if (nomeTipo.toLowerCase().includes('laboratório')){ nomeTipo = 'Laboratório'; }

            return{
              nome: `${nomeTipo} ${a.numAmbiente}`, // Usar crase
              chamados: qtdChamados.toString()
            };
          });

          this.cardsOriginais = cardsMontados; // Guardar todos os cards
          this.cards = [...cardsMontados] // Exibir todos inicialmente
          this.carregado = true;
        },
        error: (err) => {
        console.error('Erro ao carregar dados:', err);
      }
    });
  }

  filtrarLocais(): void { // Busca dinâmica enquanto o usuário digita
    if(this.opcaoAtual === 'outros')
    {
      this.cards = [...this.cardsOriginais]; // Cards estáticos para Outros
      return;
    }

    const local = this.localPesquisa.trim().toLowerCase();

    if (!local){
      this.cards = [...this.cardsOriginais]; // Se a pesquisa estiver vazia
      return;
    }

    this.cards = this.cardsOriginais.filter(card =>
      card.nome.toLowerCase().includes(local)
    );
  }

}
