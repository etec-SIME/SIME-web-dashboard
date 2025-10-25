import { PermissaoTipoPerfilRequestDTO } from '../../DTOs/PermissaoTipoPerfilRequestDTO';
import { EscolaService } from './../../services/escola/escola.service';
import { Component } from '@angular/core';
import { tipoPerfilRequestDTO } from '../../DTOs/tipoPerfilRequestDTO';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TipoPerfilPermissoesResponseDTO } from '../../DTOs/TipoPerfilPermissoesResponseDTO';
import { permissao } from '../../models/permissao';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-perfil',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  permissoes: permissao[] = [];
  tiposPerfis: TipoPerfilPermissoesResponseDTO[] = [];

  idTipoPerfil: number = 0;

  idPermissoes: number = 0;

  mostrarModal = false;
  departamentos = ['TI', 'Administração', 'Manutenção', 'Direção'];

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  perfis = [
      { nome: 'Usuário', permissoesCount: 2 },
      { nome: 'Gestor Geral', permissoesCount: 7 },
      { nome: 'Administrador', permissoesCount: 9, selected: true }
    ];

  // permissoes = [
  //   { key: 'criar-chamado', nome: 'Criar chamado' },
  //   { key: 'aprovar-chamado', nome: 'Aprovar chamado', checked: true },
  //   { key: 'criar-perfil', nome: 'Criar novo perfil', checked: true },
  //   { key: 'criar-tipo-perfil', nome: 'Criar novo tipo de perfil' },
  //   { key: 'definir-prioridade', nome: 'Definir prioridade' },
  //   { key: 'comentar-chamado', nome: 'Comentar no chamado', checked: true },
  //   { key: 'reprovar-chamado', nome: 'Reprovar chamado' },
  //   { key: 'visualizar-tipos', nome: 'Visualizar todos os tipos de chamados' }
  // ];

  constructor(private escolaService: EscolaService, private router: Router){}

  ngOnInit(): void {
    this.carregarPermissoesPerfil();
  }

  carregarPermissoesPerfil() {
    forkJoin({
      permissoes: this.escolaService.getAllPermissoes(),
      tipoPerfil: this.escolaService.getTipoPerfilPermissoes()
    }).subscribe({
      next: ({permissoes, tipoPerfil}) => {
        this.permissoes = permissoes;
        this.tiposPerfis = tipoPerfil;

        console.log('Permissões carregadas:', this.permissoes);
        console.log('Tipos de perfil carregados:', this.tiposPerfis);
      },
      error: (error) => {
        console.error('Erro ao carregar permissões e tipos de perfil:', error);
      }
    })
  }

  voltar() {
    this.router.navigate(['/layout/chamados-pendentes']);
  }

  // mandarNomePerfil(nome: string){
  //   this.nomeTipoPerfil.push(nome.toUpperCase());
  // }
}
