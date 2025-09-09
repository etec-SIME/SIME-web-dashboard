import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { ChamadosConcluidosComponent } from './pages/chamados-concluidos/chamados-concluidos.component';
import { ChamadosPendentesComponent } from './pages/chamados-pendentes/chamados-pendentes.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { GestorGeralComponent } from './pages/gestor-geral/gestor-geral.component';
import { CriarComponent } from './pages/criar/criar.component';

export const routes: Routes = [
    { path: '', component: LayoutComponent,
      children: [
        { path: 'chamados-pendentes', component: ChamadosPendentesComponent, data: { titulo: 'Chamados Pendentes' } },
        { path: 'chamados-concluidos', component: ChamadosConcluidosComponent, data: { titulo: 'Chamados Concluídos' } },
        { path: 'home', component: HomeComponent, data: { titulo: 'Home - Locais' } },
        { path: 'criar', component: CriarComponent, data: { titulo: "Criar" } }
      ]
    },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'funcionarios', component: FuncionariosComponent },
    {path: 'gestor-geral', component: GestorGeralComponent},
    { path: '**', redirectTo: '' }
];
