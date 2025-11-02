import { PermissaoTipoPerfilRequestDTO } from '../../DTOs/PermissaoTipoPerfilRequestDTO';
import { EscolaService } from './../../services/escola/escola.service';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TipoPerfilPermissoesResponseDTO } from '../../DTOs/TipoPerfilPermissoesResponseDTO';
import { permissao } from '../../models/permissao';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { tipoPerfilRequestDTO } from '../../DTOs/tipoPerfilRequestDTO';

@Component({
  selector: 'app-perfil',
  imports: [RouterModule, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  permissoes: permissao[] = [];
  tiposPerfis: TipoPerfilPermissoesResponseDTO[] = [];
  perfilSelecionado: any = null;
  nomeModal: string = '';

  mostrarModal = false;
  departamentos = ['TI', 'Administração', 'Manutenção', 'Direção'];

  constructor(private escolaService: EscolaService, private router: Router){}

  ngOnInit(): void {
    this.carregarPermissoesAndPerfil();
  }

  carregarPermissoesAndPerfil() {
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

  selecionarTipoPerfil(perfil: any) {
    this.perfilSelecionado = JSON.parse(JSON.stringify(perfil));
  }

  togglePermissao(perm: any, event: any) {
    if (!this.perfilSelecionado) return;

    const checked = event.target.checked;

    if (checked) {
      if (!this.perfilSelecionado.permissaoList.some((p: any) => p.idPermissao === perm.idPermissao)) {
        this.perfilSelecionado.permissaoList.push(perm);
      }
    } else {
      this.perfilSelecionado.permissaoList = this.perfilSelecionado.permissaoList.filter(
        (p: any) => p.idPermissao !== perm.idPermissao
      );
    }
  }

  isPermissaoSelecionada(perm: permissao): boolean {
    return this.perfilSelecionado?.permissaoList?.some((p: { idPermissao: number; }) => p.idPermissao === perm.idPermissao) ?? false;
  }

  salvarAlteracoes() {
    if (!this.perfilSelecionado) return;

    const request: PermissaoTipoPerfilRequestDTO = {
      idPermissoes: this.perfilSelecionado.permissaoList.map((p: any) => p.idPermissao)
    };

    this.escolaService.atribuirPermissoesTipoPerfil(this.perfilSelecionado.idTipoPerfil, request).subscribe({
      next: (res) => {
        console.log('Permissões atualizadas com sucesso', res);
        alert('Permissões salvas!');
      },
      error: (err) => {
        console.error('Erro ao salvar permissões', err);
        alert('Erro ao salvar permissões');
      }
    });
  }

    abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  criarTipoPerfil() {
    const request: tipoPerfilRequestDTO = {
      nomeTipoPerfil: this.nomeModal
    };

    console.log('Request para criar tipo de perfil:', this.nomeModal);
    
    this.escolaService.cadastrarTipoPerfil(request).subscribe({
      next: (res) => {
        console.log('Tipo de perfil criado com sucesso', res);
        this.fecharModal();
        this.carregarPermissoesAndPerfil();
      },
      error: (err) => {
        console.error('Erro ao criar tipo de perfil', err);
      }
    });
  }

  voltar() {
    this.router.navigate(['/layout/home']);
  }
}
