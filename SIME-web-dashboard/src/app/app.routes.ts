import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { ChamadosConcluidosComponent } from './pages/chamados-concluidos/chamados-concluidos.component';
import { ChamadosPendentesComponent } from './pages/chamados-pendentes/chamados-pendentes.component';
import { EscolaComponent } from './pages/escola/escola.component';

export const routes: Routes = [
    { path: '', component: EscolaComponent  },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'funcionarios', component: FuncionariosComponent },
    { path: 'chamados-pendentes', component: ChamadosPendentesComponent },
    { path: 'chamados-concluidos', component: ChamadosConcluidosComponent },
    { path: 'escolas', component: EscolaComponent},
    { path: '**', redirectTo: '' }
];
