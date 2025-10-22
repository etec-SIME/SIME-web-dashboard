import { permissaoTipoPerfilDTO } from './../../DTOs/permissaoTipoPerfilDTO';
import { EscolaService } from './../../services/escola/escola.service';
import { Component } from '@angular/core';
import { tipoPerfilRequestDTO } from '../../DTOs/tipoPerfilRequestDTO';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  tipoPerfil: tipoPerfilRequestDTO[] = [];
  idTipoPerfil: number = 0;

  permissaoTipoPerfilDTO: permissaoTipoPerfilDTO[] = [];
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

  permissoes = [
    { key: 'criar-chamado', nome: 'Criar chamado' },
    { key: 'aprovar-chamado', nome: 'Aprovar chamado', checked: true },
    { key: 'criar-perfil', nome: 'Criar novo perfil', checked: true },
    { key: 'criar-tipo-perfil', nome: 'Criar novo tipo de perfil' },
    { key: 'definir-prioridade', nome: 'Definir prioridade' },
    { key: 'comentar-chamado', nome: 'Comentar no chamado', checked: true },
    { key: 'reprovar-chamado', nome: 'Reprovar chamado' },
    { key: 'visualizar-tipos', nome: 'Visualizar todos os tipos de chamados' }
  ];

  constructor(private escolaService: EscolaService, private router: Router){}

  ngOnInit(): void {
    this.escolaService.getAllTipoPerfil().subscribe(resp => this.tipoPerfil = resp);
  }

  voltar() {
    this.router.navigate(['/layout/chamados-pendentes']);
  }

  // mandarNomePerfil(nome: string){
  //   this.nomeTipoPerfil.push(nome.toUpperCase());
  // }
}
