import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { ChamadosConcluidosComponent } from './pages/chamados-concluidos/chamados-concluidos.component';
import { ChamadosPendentesComponent } from './pages/chamados-pendentes/chamados-pendentes.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CriarChamadoComponent } from './pages/criar-chamado/criar-chamado.component';

export const routes: Routes = [
    { path: '', component: LayoutComponent,
      children: [
        { path: 'home', component: HomeComponent, data: { titulo: 'Home - Locais' } },
        { path: 'chamados-pendentes', component: ChamadosPendentesComponent, data: { titulo: 'Chamados Pendentes' } },
        { path: 'chamados-concluidos', component: ChamadosConcluidosComponent, data: { titulo: 'Chamados Concluídos' } },
        { path: 'criar-chamado', component: CriarChamadoComponent, data: { titulo: 'Criar Chamado' } }
      ]
    },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'funcionarios', component: FuncionariosComponent },
    { path: '**', redirectTo: '' }
];
