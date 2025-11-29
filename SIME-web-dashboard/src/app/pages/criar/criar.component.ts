import { forkJoin } from 'rxjs';
import { UsuarioProjection } from '../../DTOs/Projections/usuarioProjection';
import { EscolaService } from '../../services/escola/escola.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Component} from '@angular/core';
import { tipoPerfilRequestDTO } from '../../DTOs/tipoPerfilRequestDTO';
import { departamentoRequestDTO } from '../../DTOs/departamentoRequestDTO';
import { equipamentoRequestDTO } from '../../DTOs/equipamentoRequestDTO';
import { RouterModule, Router } from '@angular/router';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';
import { TipoChamadoSelectDTO } from '../../DTOs/TipoChamadoSelectDTO';
import { sharedImports } from '../../shared/shared-imports';

@Component({
  selector: 'app-criar',
  imports: [RouterModule, sharedImports],
  templateUrl: './criar.component.html',
  styleUrl: './criar.component.css'
})
export class CriarComponent{

  locais: AmbienteSelectDTO[] = []; //ambienteRequestDTO
  tiposChamado: TipoChamadoSelectDTO[] = []; //tipoChamadoRequestDTO
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

  constructor(private escolaService: EscolaService, private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.carregarElementos();
  }

  carregarElementos(): void{
    //permite fazer várias requisações assíncronas ao mesmo tempo
    forkJoin({
      locais: this.escolaService.getAllAmbiente(),
      tiposChamado: this.escolaService.getAllTipoChamado(),
      tiposPerfis: this.escolaService.getAllTipoPerfil(),
      perfis: this.usuarioService.getAllUsuarios(),
      departamentos: this.escolaService.getAllDepartamento(),
      equipamentos: this.escolaService.getAllEquipamento()
    }).subscribe(results => {
    this.locais = results.locais;
    this.perfis = results.perfis;
    this.tiposChamado = results.tiposChamado;
    this.tiposPerfis = results.tiposPerfis;
    this.departamentos = results.departamentos;
    this.equipamentos = results.equipamentos;

    this.qtdLocais = this.locais.length;
    this.qtdPerfis = this.perfis.length;
    this.qtdDepartamentos =  this.departamentos.length;
    this.qtdEquipamentos = this.equipamentos.length;
    this.qtdTipoPerfis = this.tiposPerfis.length
    this.qtdTiposChamado = this.tiposChamado.length;
  });
    //this.escolaService.getAllAmbiente().subscribe((resp) => { this.locais = resp })
  }

  navCadastroFuncionario(){
    this.router.navigate(['/layout/cadastro-funcionario']);
  }
  
  navCriarLocal(){
    this.router.navigate(['/layout/criar-ambiente']);
  }

  navCriarTipoPerfil() {
    this.router.navigate(['/layout/perfil']);
  }

}
