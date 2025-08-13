import { Component, OnInit } from '@angular/core';
import { EscolaService } from '../../services/escola/escola.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { escolaProjection } from '../../DTOs/Projections/escolaProjection';
import { ambiente } from '../../models/ambiente';
import { departamento } from '../../models/departamento';

@Component({
  selector: 'app-escola',
  imports: [CommonModule, RouterModule],
  templateUrl: './escola.component.html',
  styleUrl: './escola.component.css'
})
export class EscolaComponent implements OnInit{

  ambientes: ambiente[] = []
  departamentos: departamento[] = []
  escolas: escolaProjection[] = []

  constructor(private escolaService: EscolaService){}
  carregado: boolean = false;

  ngOnInit(): void{
    this.escolaService.getAllEscolas().subscribe((resp) => {
      //console.log('Escolas: ', resp);
      this.escolas = resp,
      this.carregado = true
    })
      this.escolaService.getAllAmbiente().subscribe((resp) => {
        this.ambientes = resp,
        this.carregado = true
      })

      this.escolaService.getAllDepartamento().subscribe((resp) => {
        this.departamentos = resp,
        this.carregado = true
  })
  }
}
