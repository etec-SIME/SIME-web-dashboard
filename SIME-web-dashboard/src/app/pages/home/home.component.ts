import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private STORAGE_KEY = 'opcaoAtualHome'; // Não atualizar o estado do botão sem o usuário clicar

  ambienteSelecionado: string | null = null;
  carregado: boolean = false;
  localPesquisa: string = '';
  private rotaId: number | null = null;

  // Estrutura de exibição dos cards no html
  cards: {idAmbiente: number; nome: string; chamados: string}[] = [];
  cardsOriginais: {idAmbiente: number; nome: string; chamados: string}[] = [];

  constructor
  (private route: ActivatedRoute,
  private router: Router,
  private escolaService: EscolaService, 
  private chamadoService: ChamadoService){}

  ngOnInit(): void {
    const salvo = localStorage.getItem(this.STORAGE_KEY);
    if (salvo === 'salas' || salvo === 'labs' || salvo === 'outros') {
      this.opcaoAtual = salvo as any;
    }

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.rotaId = id ? Number(id) : null;
    });
    
    this.carregarDados();
  }

  setOpcao(opcao: 'salas' | 'labs' | 'outros') {
    const exibindoChamadosAmbiente = this.rotaId !== null;

    if(this.opcaoAtual !== opcao){
      this.modoAtual = 'locais';
      this.ambienteSelecionado = null;
    }

    this.opcaoAtual = opcao;
    this.localPesquisa = '';

    localStorage.setItem(this.STORAGE_KEY, opcao);

    if (exibindoChamadosAmbiente) {
      this.retornarLocais();
      return;
    }

    if(this.carregado){
      this.aplicarFiltroPorOpcao();
    }
  }

  carregarDados(): void {
    forkJoin({
      tipos: this.escolaService.getAllTipoAmbiente(),
      ambientes: this.chamadoService.getAmbienteChamadoSelect(),
      chamados: this.chamadoService.getChamadosByAmbiente(),
      tipoChamados: this.escolaService.getAllTipoChamado()
    }).subscribe({
      next: (res) => {
        this.tipoAmbientes = res.tipos;
        this.ambientes = res.ambientes;
        this.chamados = res.chamados;
        this.tiposChamado = res.tipoChamados;
        this.chamadosAmbiente = [...this.chamados]

        this.carregado = true;

        this.aplicarFiltroPorOpcao();

        if (this.rotaId !== null) {
            this.exibirChamados(this.rotaId);
          }
        },
        error: (err) => {
        console.error('Erro ao carregar dados:', err);
      }
    });
  }

  aplicarFiltroPorOpcao(){
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
        const qtdChamados = this.chamados.filter(c => c.ambiente?.idAmbiente === a.idAmbiente 
          && c.statusAtualGeralChamado != "Concluído").length;

        // Simplificar o nome se for um laboratório para caber dentro do card no html
        let nomeTipo = tipo?.nomeTipoAmbiente || '';
        if (nomeTipo.toLowerCase().includes('laboratório')){ nomeTipo = 'Laboratório'; }

        return{
          idAmbiente: a.idAmbiente,
          nome: `${nomeTipo} ${a.numAmbiente}`, // Usar crase
          chamados: qtdChamados.toString().padStart(2, '0')
        };
      });

      this.cardsOriginais = cardsMontados; // Guardar todos os cards
      this.cards = [...cardsMontados] // Exibir todos inicialmente

  }

  pesquisarLocais(): void {
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

  abrirAmbiente(card: { idAmbiente: number }){
    this.router.navigate(['layout/home/ambiente/', card.idAmbiente]);
  }

  exibirChamados(id:number){
    const ambiente = this.ambientes.find(a => a.idAmbiente === id);
    if (!ambiente) return;

    this.modoAtual = 'chamados';
    this.ambienteSelecionado = `${ambiente.nomeTipoAmbiente} ${ambiente.numAmbiente}`;
  
    this.chamadosAmbiente = this.chamados.filter(
      c => c.tipoAmbiente.idTipoAmbiente === ambiente.idTipoAmbiente &&
      c.ambiente.idAmbiente === ambiente.idAmbiente && c.statusAtualGeralChamado != "Concluído"
    )
  }

  retornarLocais(navegar = true){
    this.rotaId = null;
    this.modoAtual = 'locais';
    this.ambienteSelecionado = null;
    this.chamadosAmbiente = [];

    if (navegar){
      this.router.navigate(['layout/home']);
    }
  }

}
