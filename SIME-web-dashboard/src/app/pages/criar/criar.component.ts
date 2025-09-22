import { UsuarioProjection } from '../../DTOs/Projections/UsuarioProjection';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-criar',
  imports: [],
  templateUrl: './criar.component.html',
  styleUrl: './criar.component.css'
})
export class CriarComponent {

  perfis: UsuarioProjection[] = [];
  qtdPerfis: number = 0;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarElemeentos();
  }

  carregarElemeentos(): void{
    this.usuarioService.getAllUsuarios()
    .subscribe(
      resp => this.perfis = resp
    );
    this.qtdPerfis = this.perfis.length;
  }

}
