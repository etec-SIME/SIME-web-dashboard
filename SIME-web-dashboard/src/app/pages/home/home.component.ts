import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarioMensalComponent } from "../../components/calendario-mensal/calendario-mensal.component";
import { CalendarioSemanalComponent } from "../../components/calendario-semanal/calendario-semanal.component";
import { tipoAmbienteRequestDTO } from '../../DTOs/tipoAmbienteRequestDTO';
import { forkJoin } from 'rxjs';
import { EscolaService } from '../../services/escola/escola.service';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';
import { CommonModule } from '@angular/common';
import { ChamadoService } from '../../services/chamado/chamado.service';
import { TipoChamadoSelectDTO } from '../../DTOs/TipoChamadoSelectDTO';
import { ChamadosLocaisCardsComponent } from "../../components/chamados-locais-cards/chamados-locais-cards.component";
import { chamadosAmbienteDTO } from '../../DTOs/chamadosAmbienteDTO';
import { sharedImports } from '../../shared/shared-imports';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarioMensalComponent, CalendarioSemanalComponent, ChamadosLocaisCardsComponent, sharedImports],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  tipoAmbientes: tipoAmbienteRequestDTO[] = [];
  ambientes: AmbienteSelectDTO[] = [];
  chamados: chamadosAmbienteDTO[] = [];
  tiposChamado: TipoChamadoSelectDTO[] = [];
  chamadosAmbiente: chamadosAmbienteDTO[] = [];

  opcaoAtual: 'salas' | 'labs' | 'outros' = 'salas';
  modoAtual: 'locais' | 'chamados' = 'locais';
  ambienteSelecionado: string | null = null;
  carregado: boolean = false;
  localPesquisa: string = '';

  // Estrutura de exibição dos cards no html
  cards: {nome: string; chamados: string}[] = [];
  cardsOriginais: {nome: string; chamados: string}[] = [];

  constructor(private escolaService: EscolaService, private chamadoService: ChamadoService){}

  ngOnInit(): void {
    this.setOpcao('salas');
  }

  setOpcao(opcao: 'salas' | 'labs' | 'outros') {
    if(this.opcaoAtual !== opcao){
      this.modoAtual = 'locais';
      this.ambienteSelecionado = null;
    }

    this.opcaoAtual = opcao;
    this.localPesquisa = ''; // Vai limpar o campo quando mudar de aba
    this.carregado = false;
    this.carregarDados();
  }

  carregarDados(): void {
    forkJoin({
      tipos: this.escolaService.getAllTipoAmbiente(),
      ambientes: this.chamadoService.getAmbienteChamadoSelect(), //Usa AmbienteSelectDTO
      chamados: this.chamadoService.getChamadosByAmbiente(),
      tipoChamados: this.escolaService.getAllTipoChamado()
    }).subscribe({
      next: (res) => {
        //console.log("Dados recebidos da API:", res);
        this.tipoAmbientes = res.tipos;
        this.ambientes = res.ambientes;
        this.chamados = res.chamados;
        this.tiposChamado = res.tipoChamados;
        this.chamadosAmbiente = [...this.chamados]

        /*console.log('Ambientes recebidos:', this.ambientes);
        console.log('Chamados recebidos:', this.chamados.slice(0, 5));*/

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
            const qtdChamados = this.chamados.filter(c => c.ambiente?.idAmbiente === a.idAmbiente && c.statusAtualGeralChamado != "Concluído").length;

            // Simplificar o nome se for um laboratório
            let nomeTipo = tipo?.nomeTipoAmbiente || '';
            if (nomeTipo.toLowerCase().includes('laboratório')){ nomeTipo = 'Laboratório'; }

            return{
              nome: `${nomeTipo} ${a.numAmbiente}`, // Usar crase
              chamados: qtdChamados.toString().padStart(2, '0')
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

  exibirChamados(nomeAmbiente: string){
    this.ambienteSelecionado = nomeAmbiente;
    this.modoAtual = 'chamados';

    const numeroAmbiente = parseInt(nomeAmbiente.match(/\d+$/)?.[0] || '')

    const nomeTipoAmbiente = nomeAmbiente.replace(/\d+$/, '').trim();

    const ambiente = this.ambientes.find( a => a.numAmbiente === numeroAmbiente &&
      a.nomeTipoAmbiente.toLowerCase().includes(nomeTipoAmbiente.toLowerCase()));
    if (!ambiente) return;


    this.chamadosAmbiente = this.chamados.filter(
      c => c.tipoAmbiente.idTipoAmbiente === ambiente.idTipoAmbiente &&
      c.ambiente.idAmbiente === ambiente.idAmbiente && c.statusAtualGeralChamado != "Concluído");

    //c => c.tipoAmbiente.idTipoAmbiente === ambiente.idTipoAmbiente

  }

  retornarLocais(){
    this.modoAtual = 'locais';
    this.ambienteSelecionado = null;
  }

}
