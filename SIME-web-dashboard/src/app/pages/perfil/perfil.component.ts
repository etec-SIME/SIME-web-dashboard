import { permissaoTipoPerfilDTO } from './../../DTOs/permissaoTipoPerfilDTO';
import { EscolaService } from './../../services/escola/escola.service';
import { Component } from '@angular/core';
import { tipoPerfilRequestDTO } from '../../DTOs/tipoPerfilRequestDTO';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  tipoPerfil: tipoPerfilRequestDTO[] = [];
  idTipoPerfil: number = 0;

  permissaoTipoPerfilDTO: permissaoTipoPerfilDTO[] = [];
  idPermissoes: number = 0;

  constructor(private escolaService: EscolaService){}

  ngOnInit(): void {
    this.escolaService.getAllTipoPerfil().subscribe(resp => this.tipoPerfil = resp);
  }

  mandarNomePerfil(nome: string){
    this.nomeTipoPerfil.push(nome.toUpperCase());
  }

}
