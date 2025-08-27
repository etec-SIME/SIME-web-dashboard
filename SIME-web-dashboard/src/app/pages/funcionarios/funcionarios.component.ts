import { Component, OnInit } from '@angular/core';
import { usuarioProjection } from '../../DTOs/Projections/UsuarioProjection';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.css'
})
export class FuncionariosComponent implements OnInit {

  funcionarios: usuarioProjection[] = [];

  constructor(private funcionarioService: FuncionarioService) {}

  carregado: boolean = false;

  ngOnInit(): void {
    this.funcionarioService.getAllFuncionarios().subscribe((resp) => {
      //console.log('Funcionários:', resp);
      this.funcionarios = resp;
      this.carregado = true;
    });
  }

}
