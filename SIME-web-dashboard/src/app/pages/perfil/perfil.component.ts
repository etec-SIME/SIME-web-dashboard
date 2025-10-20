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

  constructor(private escolaService: EscolaService){}

  ngOnInit(): void {
    this.escolaService.getAllTipoPerfil().subscribe(resp => this.tipoPerfil = resp);
  }
  
}
