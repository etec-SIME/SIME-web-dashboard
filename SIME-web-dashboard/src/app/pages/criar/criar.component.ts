import { UsuarioProjection } from '../../DTOs/Projections/UsuarioProjection';
import { EscolaService } from '../../services/escola/escola.service';
import { ambienteRequestDTO } from '../../DTOs/ambienteRequestDTO';
import { tipoChamadoRequestDTO } from '../../DTOs/tipoChamadoRequestDTO';
import { tipoPerfilRequestDTO } from '../../DTOs/tipoPerfilRequestDTO';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { departamentoRequestDTO } from '../../DTOs/departamentoRequestDTO';
import { equipamentoRequestDTO } from '../../DTOs/equipamentoRequestDTO';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criar',
  imports: [],
  templateUrl: './criar.component.html',
  styleUrl: './criar.component.css'
})
export class CriarComponent implements OnInit{

  locais: ambienteRequestDTO[] = [];
  tiposChamado: tipoChamadoRequestDTO[] = [];
  tiposPerfis: tipoPerfilRequestDTO[] = [];
  perfis: UsuarioProjection[] = [];
  departamentos: departamentoRequestDTO[] = [];
  equipamentos: equipamentoRequestDTO[] = [];

  qtdLocais: number = 0;
  qtdTiposChamado: number = 0;
  qtdTipoPerfis: number = 0;
  qtdPerfis: number = 0;
  qtdDepartamentos: number = 0;
  qtdEquipamentos: number = 0;

  constructor(private escolaService: EscolaService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarElementos();
  }

  carregarElementos(): void{

    this.escolaService.getAllAmbiente()
      .subscribe(resp => this.locais = resp);

    this.escolaService.getAllTipoChamado()
      .subscribe(resp => this.tiposChamado = resp);

    this.escolaService.getAllTipoPerfil()
      .subscribe(resp => this.tiposPerfis = resp);

    this.usuarioService.getAllUsuarios()
      .subscribe(resp => this.perfis = resp);

    this.escolaService.getAllDepartamento()
      .subscribe(resp => this.departamentos = resp);

    this.escolaService.getAllEquipamento()
      .subscribe(resp => this.equipamentos = resp);

    this.qtdTiposChamado = this.tiposChamado.length;
    this.qtdTipoPerfis = this.tiposPerfis.length;
    this.qtdPerfis = this.perfis.length;
    this.qtdDepartamentos =  this.departamentos.length;
    this.qtdEquipamentos = this.equipamentos.length;

    console.log(this.locais);
  }
}
