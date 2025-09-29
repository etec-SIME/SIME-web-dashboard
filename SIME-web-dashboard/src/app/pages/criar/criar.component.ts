import { forkJoin } from 'rxjs';
import { ambienteRequestDTO } from '../../DTOs/ambienteRequestDTO';
import { UsuarioProjection } from '../../DTOs/Projections/usuarioProjection';
import { EscolaService } from '../../services/escola/escola.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Component} from '@angular/core';
import { tipoChamadoRequestDTO } from '../../DTOs/tipoChamadoRequestDTO';
import { tipoPerfilRequestDTO } from '../../DTOs/tipoPerfilRequestDTO';
import { departamentoRequestDTO } from '../../DTOs/departamentoRequestDTO';
import { equipamentoRequestDTO } from '../../DTOs/equipamentoRequestDTO';

@Component({
  selector: 'app-criar',
  imports: [],
  templateUrl: './criar.component.html',
  styleUrl: './criar.component.css'
})
export class CriarComponent{

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

}
