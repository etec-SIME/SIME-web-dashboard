import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { ChamadosConcluidosComponent } from './pages/chamados-concluidos/chamados-concluidos.component';
import { ChamadosPendentesComponent } from './pages/chamados-pendentes/chamados-pendentes.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { EscolaComponent } from './pages/escola/escola.component';

/*
export const routes: Routes = [
    { path: '', component: EscolaComponent  },*/

export const routes: Routes = [
    { path: '', component: LayoutComponent,
      children: [
        { path: 'chamados-pendentes', component: ChamadosPendentesComponent, data: { titulo: 'Chamados Pendentes' } },
        { path: 'chamados-concluidos', component: ChamadosConcluidosComponent, data: { titulo: 'Chamados Concluídos' } },
        { path: 'home', component: HomeComponent, data: { titulo: 'Home - Locais' } },	
      ]
    },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'funcionarios', component: FuncionariosComponent },
    { path: 'escolas', component: EscolaComponent  },
    { path: '**', redirectTo: '' }
];
