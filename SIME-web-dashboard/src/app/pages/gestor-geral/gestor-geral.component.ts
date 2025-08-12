import { Component, OnInit } from '@angular/core';
import { chamadoProjection } from '../../DTOs/Projections/chamadoProjection';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GestorGeralService } from '../../services/gestor-geral/gestor-geral.service';

@Component({
  selector: 'app-gestor-geral',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestor-geral.component.html',
  styleUrl: './gestor-geral.component.css'
})
export class GestorGeralComponent implements OnInit{

  chamados: chamadoProjection[] = [];

  constructor(private gestorGeralService: GestorGeralService){}

  carregado: boolean = false;

  ngOnInit(): void {
    this.gestorGeralService.getAllChamados().subscribe((resp) => {
      this.chamados = resp,
      this.carregado = true;
    });
  }

}
